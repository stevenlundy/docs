import { withRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Markdown from 'react-markdown'

import { Code, InlineCode } from '~/components/code'
import Layout from '~/components/layout/layout'
import Main from '~/components/layout/main'
import H1 from '~/components/text/h1'
import H2 from '~/components/text/h2'
import H3 from '~/components/text/h3'
import H4 from '~/components/text/h4'
import H5 from '~/components/text/h5'
import H6 from '~/components/text/h6'
import { UL, LI } from '~/components/list'
import { P } from '~/components/text/paragraph'
import Quote from '~/components/text/quote'
import Strong from '~/components/text/strong'
import {
  LabeledExternalLink,
  IconExternalLink,
  GenericLink
} from '~/components/text/link'

import ForkIcon from '~/components/icons/fork'
import ExternalLinkIcon from '~/components/icons/external-link'

import * as bodyLocker from '~/lib/utils/body-locker'
import Head from '~/components/layout/head'
import DocsIndex from '~/components/layout/index'
import Content from '~/components/layout/content'
import Sidebar from '~/components/layout/sidebar'
import ToggleGroup, { ToggleItem } from '~/components/toggle-group'
import withError from '~/components/layout/error'
import EXAMPLES from '~/lib/data/now-examples-docs'

const CodeMarkdown = ({ language, value }) => (
  <Code lang={language}>{value}</Code>
)

const Headings = ({ level, children }) => {
  switch (level) {
    case 1:
      // This helps us put the title on above the custom buttons
      return null
    case 2:
      return <H2>{children}</H2>
    case 3:
      return <H3>{children}</H3>
    case 4:
      return <H4>{children}</H4>
    case 5:
      return <H5>{children}</H5>
    case 6:
      return <H6>{children}</H6>
    default:
      return <p>{children}</p>
  }
}

export const mdxComponents = {
  paragraph: P,
  strong: Strong,
  list: UL,
  listItem: LI,
  heading: Headings,
  code: CodeMarkdown,
  inlineCode: InlineCode,
  link: GenericLink,
  blockquote: Quote
}

function wrapSidebar(sections) {
  return [
    {
      title: 'Examples',
      slug: 'examples',
      sections
    }
  ]
}

class ExamplesPage extends React.Component {
  constructor(props) {
    super(props)
    const sidebarData = wrapSidebar(
      Object.values(EXAMPLES).map(item => {
        return {
          title: item.name,
          slug: item.slug,
          entries: [],
          isPage: true
        }
      })
    )

    this.state = {
      initialSidebar: sidebarData
    }
  }

  componentDidMount() {
    let filteredList = this.sortList(this.state.initialSidebar[0].sections)
    this.setState({ sidebar: wrapSidebar(filteredList) })
  }

  filterSidebar = input => {
    const filteredList = this.state.initialSidebar[0].sections.filter(item => {
      return item.title.toLowerCase().search(input.toLowerCase()) !== -1
    })

    this.setState({ sidebar: wrapSidebar(filteredList) })
  }

  handleIndexClick = () => {
    if (this.state.navigationActive) {
      bodyLocker.unlock()
      this.setState({
        navigationActive: false
      })
    }
  }

  sortList = list => {
    list.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      }
      return 0
    })
    return list
  }

  render() {
    const { router } = this.props
    const { navigationActive, sidebar } = this.state
    const { name, demo, fork, content } = this.props.example
    const title = !this.props.initExample ? ` - ${name}` : ''

    const active = {
      category: 'examples',
      section: this.props.example ? this.props.example.slug : null,
      entry: null
    }

    return (
      <Layout>
        <Head
          description="A comprehensive guide to using the Now API and gaining control over the Now platform"
          title={`Now by Example${title}`}
          titlePrefix=""
          titleSuffix=" - ZEIT"
        />
        <Main>
          <Sidebar active={navigationActive} innerRef={this.handleSidebarRef}>
            <div className="toggle-group-wrapper">
              <ToggleGroup>
                <ToggleItem
                  active={
                    router.pathname.startsWith('/docs') &&
                    !router.pathname.startsWith('/docs/api')
                  }
                >
                  <Link prefetch href="/docs">
                    <a onClick={this.handleIndexClick}>Docs</a>
                  </Link>
                </ToggleItem>
                <ToggleItem active={router.pathname.startsWith('/docs/api')}>
                  <Link prefetch href="/docs/api">
                    <a onClick={this.handleIndexClick}>API Reference</a>
                  </Link>
                </ToggleItem>
                <ToggleItem active={router.pathname.startsWith('/examples')}>
                  <Link prefetch href="/examples">
                    <a onClick={this.handleIndexClick}>Examples</a>
                  </Link>
                </ToggleItem>
              </ToggleGroup>
            </div>
            {this.state.sidebar && (
              <DocsIndex
                activeItem={active}
                examples
                getHref={slugs => {
                  return {
                    href: `/examples/${slugs.section}`,
                    as: `/examples/${slugs.section}`
                  }
                }}
                onSectionActive={() => {}}
                onClickLink={this.handleIndexClick}
                structure={sidebar}
                setInitiallyActive={() => {}}
                updateActive={() => {}}
              />
            )}
          </Sidebar>
          <Content>
            <div className="category-wrapper">
              <H1>{name}</H1>
              <div className="buttons">
                <div className="fork-button">
                  <IconExternalLink
                    icon={<ForkIcon />}
                    href={`https://github.com/zeit/now-examples/tree/master${fork}`}
                  >
                    Fork
                  </IconExternalLink>
                </div>
                <LabeledExternalLink
                  label="Live Demo"
                  href={demo}
                  icon={<ExternalLinkIcon />}
                >
                  {demo}
                </LabeledExternalLink>
              </div>
              <Markdown source={content} renderers={mdxComponents} />
            </div>
          </Content>
        </Main>
        <style jsx>{`
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .category-wrapper {
            padding: 40px 0;
          }

          .category-wrapper:not(:last-child) {
            border-bottom: 1px solid #eaeaea;
          }

          .toggle-group-wrapper {
            display: none;
          }

          .buttons {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 25px;
          }

          .fork-button {
            margin-right: 10px;
          }

          @media screen and (max-width: 950px) {
            .toggle-group-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 40px;
            }

            .buttons {
              align-items: flex-start;
              padding-top: 25px;
            }

            .fork-button {
              margin-bottom: 10px;
            }
          }
        `}</style>
      </Layout>
    )
  }
}

export default withRouter(withError(ExamplesPage))
