const { exec: execSync } = require('child_process')
const { promisify } = require('util')
var algoliasearch = require('algoliasearch')
const fs = require('fs')
const cheerio = require('cheerio')
const globby = require('globby')
const md5 = require('md5')
const execP = promisify(execSync)
const exec = cmd => execP(cmd)

// Main function
async function main() {
  // Initialise Algolia client
  const client = algoliasearch('NNTAHQI9C5', process.env.ALGOLIA_API_KEY)

  const tmpIndex = await client.initIndex('prod_docs_tmp')
  const mainIndex = await client.initIndex('prod_docs')

  // Array to store object with content from pages
  let index = []

  // Build project
  await exec(`next build && next export -o dist`)

  // Scan pages and add titles and content as objects in an `index` array
  let files

  try {
    files = await globby([
      'dist/guides/**/*.html',
      'dist/docs/v2/**/*.html',
      'dist/docs/api/v2/**/*.html',
      'dist/docs/integrations/v2/**/*.html',
      'dist/examples/**/*.html'
    ])
    // filter out AMP pages
    files = files.filter(f => f.indexOf('.amp/index.html') < 0)
  } catch (e) {
    throw `Failed to get pages: ${e}`
  }

  // Loop through files
  files.forEach(file => {
    const isAPISection = !!file.startsWith('dist/docs/api/v2')
    const isIntegrations = !!file.startsWith('dist/docs/integrations/v2')
    const isDocs = !!file.startsWith('dist/docs/v2')
    const isGuides = !!file.startsWith('dist/guides')

    // Fetch file contents and load it with cheerio
    const content = fs.readFileSync(file)
    const $ = cheerio.load(content)

    // Page title
    const pageTitle = $('.content-heading h1').text()

    // Current heading and element, initially null
    let currentHeading = null
    let currentSection = null
    let currentSubSection = null
    let currentEl = null
    // Current record number for the file loop, starting with ordering
    let currentRecordNumber = 1

    // Loop through all top-level elements in the content div
    $('.content > div > *, .content .category-wrapper *').each((i, e) => {
      // Get current element and its tagName
      currentEl = $(e)
      const tag = currentEl.get(0).tagName

      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
        // If the element is a heading, catch and store the heading
        // Set current heading:
        currentHeading = {
          text: currentEl.text(),
          anchor: $(currentEl)
            .children('a')
            .attr('href')
        }

        if (tag === 'h2') {
          currentSection = currentEl.text()
        } else if (tag === 'h3') {
          currentSubSection = currentEl.text()
        }
      } else if (['p', 'ul'].includes(tag)) {
        // If the element is a paragraph, create the record using available information, including the current heading, and push it to the index array.

        // Infer URL from filepath
        const url = `/${file.replace('dist/', '').replace('/index.html', '')}`

        // Create record with title, (if it exists) section heading, url (inferred), paragraph content, and order
        const record = {
          title: isAPISection || isIntegrations ? currentSection : pageTitle,
          ...(isAPISection || isIntegrations
            ? currentSubSection && { section: currentSubSection }
            : currentHeading && { section: currentHeading.text }),
          url,
          ...(currentHeading &&
            currentHeading.anchor && { anchor: currentHeading.anchor }),
          content: currentEl.text(),
          order: currentRecordNumber,
          objectID: `v2-${url}-${md5(currentEl.text())}`,
          _tags: [
            (isAPISection && 'api') ||
              (isIntegrations && 'integrations') ||
              (isDocs && 'docs') ||
              (isGuides && 'guide')
          ]
        }

        // Push record to index array
        index.push(record)

        // Increase record number for the next loop
        currentRecordNumber = currentRecordNumber + 1
      }
    })
  })

  // Test file
  // fs.writeFileSync(`test.json`, JSON.stringify(index))

  // Get settings of main index and set them to the temp index
  const indexSettings = await mainIndex.getSettings()
  await tmpIndex.setSettings(indexSettings)

  const indexTmp = [...index]

  while (indexTmp.length) {
    const { taskID } = await tmpIndex.addObjects(indexTmp.splice(0, 1000))

    await tmpIndex.waitTask(taskID)
  }

  client.moveIndex(tmpIndex.indexName, mainIndex.indexName)
}

// Execute main function
main()
