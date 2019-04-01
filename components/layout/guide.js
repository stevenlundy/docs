import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import formatDate from 'date-fns/format'

import Head from '~/components/layout/head'
import Layout from '~/components/layout/layout'
import Wrapper from '~/components/layout/wrapper'
import ContentFooter from '~/components/layout/content-footer'
import Heading from '~/components/text/linked-heading'
import components from '~/lib/mdx-components'
import H1 from '~/components/text/h1'
import H2 from '~/components/text/h2'
import H3 from '~/components/text/h3'
import H4 from '~/components/text/h4'
import H5 from '~/components/text/h5'
import { P } from '~/components/text/paragraph'
import { Avatar } from '~/components/avatar'
import HR from '~/components/text/hr'
import { GuidesFeedback } from '~/components/feedback-input'

const DocH2 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H2>{children}</H2>
    </Heading>
    <style jsx>{`
      :global(h2) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

const DocH3 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H3>{children}</H3>
    </Heading>
    <style jsx>{`
      :global(h3) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

const DocH4 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H4>{children}</H4>
    </Heading>
    <style jsx>{`
      :global(h4) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

class Guide extends React.PureComponent {
  render() {
    const {
      meta = {
        title: 'Now Documentation',
        description:
          'The knowledge base and documentation for how to use ZEIT Now and how it works.'
      }
    } = this.props

    return (
      <MDXProvider
        components={{
          ...components,
          h2: DocH2,
          h3: DocH3,
          h4: DocH4
        }}
      >
        <Layout>
          <Head
            titlePrefix=""
            titleSuffix=" - ZEIT Now Guides"
            title={`${meta.title}`}
            description={meta.description}
            image={meta.image}
          />

          <article>
            <header className="guide-heading content-heading">
              <Wrapper width="900">
                <H1>{meta.title}</H1>
                <P>{meta.description}</P>
              </Wrapper>
            </header>

            <Wrapper width="650">
              <section className="guide content">
                {this.props.children}
                <HR />
                <div className="rate-guide">
                  <H5>How Was This Guide?</H5>
                  <GuidesFeedback />
                </div>
                <HR />
                <div className="guide-author" id="authors">
                  <H5>Written By</H5>
                  <div className="authors-list">
                    {meta.authors.map(author => (
                      <div className="author-info" key={author}>
                        <Avatar
                          size={32}
                          username={author}
                          title={`Written by ${author}`}
                        />
                        <span className="username">{author}</span>
                      </div>
                    ))}
                  </div>
                  <span className="published">
                    on {formatDate(meta.published, 'MMMM Do YYYY')}
                  </span>
                </div>
                <ContentFooter
                  lastEdited={meta.lastEdited}
                  editUrl={meta.editUrl}
                />
              </section>
            </Wrapper>
          </article>

          <style jsx>{`
            .guide {
              width: 100%;
              padding-bottom: 96px;
              padding-top: 32px;
            }

            .guide-heading {
              border-bottom: 1px solid #eaeaea;
              padding-top: 144px;
              padding-bottom: 44px;
              text-align: center;
            }

            .guide-meta {
              margin-top: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .guide-meta :global(.avatar-group) {
              width: auto;
              margin-right: 16px;
            }

            .authors-list {
              display: flex;
            }

            .author-info {
              display: flex;
              align-items: center;
              margin-right: 24px;
              font-size: 14px;
            }

            .author-info :global(.avatar) {
              margin-right: 8px;
            }

            .published {
              color: #666;
              font-size: 14px;
              margin-top: 24px;
              display: block;
            }

            .guide-heading :global(h1) {
              margin-bottom: 8px;
            }

            .guide-heading :global(p) {
              font-size: 16px;
              margin-top: 8px;
              color: #444444;
            }

            .rate-guide :global(h5) {
              margin: 0;
              display: inline-block;
            }

            .rate-guide :global(.feedback) {
              display: inline-flex;
              margin-left: 24px;
            }

            @media (max-width: 552px) {
              .rate-guide :global(h5) {
                display: block;
                margin-bottom: 32px;
              }

              .rate-guide :global(.feedback) {
                margin-left: 0;
              }
            }
          `}</style>
        </Layout>
      </MDXProvider>
    )
  }
}

export default Guide
