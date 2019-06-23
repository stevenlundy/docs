const { parse } = require('url')

const data = [
  {
    id: 'gettingStarted',
    name: 'Getting Started',
    posts: [
      {
        id: 'introduction',
        name: 'Introduction',
        href: '/addons/v2#introduction'
      }
    ]
  },

  {
    id: 'apiBasics',
    name: 'API Basics',
    posts: [
      {
        id: 'serverSpecs',
        name: 'Server Specs',
        href: '/api/v2#api-basics/server-specs'
      },
      {
        id: 'contentType',
        name: 'Content Type',
        href: '/api/v2#api-basics/content-type/content-type'
      },
      {
        id: 'authentication',
        name: 'Authentication',
        href: '/api/v2#api-basics/authentication'
      },
      {
        id: 'errors',
        name: 'Errors',
        href: '/api/v2#api-basics/errors'
      },
      {
        id: 'rateLimits',
        name: 'Rate Limits',
        href: '/api/v2#api-basics/rate-limits'
      },
      {
        id: 'versioning',
        name: 'Versioning',
        href: '/api/v2#api-basics/versioning'
      },
      {
        id: 'types',
        name: 'Types',
        href: '/api/v2#api-basics/types'
      }
    ]
  }
]

export default data.map(({ posts, ...rest }) => {
  return {
    ...rest,
    posts: posts.map(p => {
      const { hash } = parse(p.href)
      return { ...p, hash }
    })
  }
})
