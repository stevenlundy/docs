import React from 'react'
import { useAmp } from 'next/amp'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import NextHead from 'next/head'
import NProgress from 'nprogress'
import debounce from 'lodash.debounce'
import RouterEvents from '../../lib/router-events'
import * as metrics from '../../lib/metrics'

let title

const start = debounce(NProgress.start, 200)
RouterEvents.on('routeChangeStart', start)
RouterEvents.on('routeChangeComplete', url => {
  start.cancel()
  NProgress.done()

  metrics.pageview(url, title)
})
RouterEvents.on('routeChangeError', () => {
  start.cancel()
  NProgress.done()
})

if (global.document) {
  const info = [
    `Version: ${process.env.VERSION}`,
    `Check out our code here: https://zeit.co/oss`,
    `Have a great day! 📣🐢`
  ]

  for (const message of info) {
    // eslint-disable-next-line no-console
    console.log(message)
  }
}

function updateTitle(newTitle) {
  title = newTitle
}

const HeadTags = props => {
  const isAmp = useAmp()
  return isAmp ? null : (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="canonical"
        href={
          props.url ||
          `https://zeit.co${props.router.asPath}` ||
          'https://zeit.co/docs'
        }
      />
    </>
  )
}

class Head extends React.PureComponent {
  componentDidMount() {
    updateTitle(
      this.props.titlePrefix + this.props.title + this.props.titleSuffix
    )
  }

  render() {
    const titlePrefix =
      null != this.props.titlePrefix ? this.props.titlePrefix : 'ZEIT – '
    const titleSuffix =
      null != this.props.titleSuffix ? this.props.titleSuffix : ''
    const ogDescription = this.props.ogDescription || this.props.description
    const { darkBg } = this.context
    return (
      <div>
        <NextHead>
          <title>{titlePrefix + this.props.title + titleSuffix}</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@zeithq" />
          <meta property="og:site_name" content="ZEIT Documentation" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={
              titlePrefix +
              (this.props.ogTitle || this.props.title) +
              titleSuffix
            }
          />
          <meta property="og:locale" content="en" />
          <meta
            property="og:url"
            content={
              this.props.url ||
              `https://zeit.co${this.props.router.asPath}` ||
              'https://zeit.co/docs'
            }
          />
          <HeadTags {...this.props} />
          {this.props.description ? (
            <meta name="description" content={this.props.description} />
          ) : null}
          {ogDescription ? (
            <meta property="og:description" content={ogDescription} />
          ) : null}
          <meta
            property="og:image"
            content={
              this.props.image ||
              `https://og-image.now.sh/${encodeURIComponent(
                this.props.ogTitle || this.props.title
              )}.png?theme=light&md=1&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnow-black.svg`
            }
          />
          {this.props.image ? (
            <meta property="twitter:image" content={this.props.image} />
          ) : null}
          {this.props.video
            ? [
                <meta property="og:type" content="video" key="0" />,
                <meta property="og:video" content={this.props.video} key="1" />,
                <meta property="og:video:type" content="video/mp4" key="2" />
              ]
            : null}

          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-57x57.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-60x60.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-72x72.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-76x76.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-114x114.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-120x120.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-144x144.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-152x152.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/apple-touch-icon-180x180.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/android-chrome-192x192.png`}
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/favicon-96x96.png`}
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/favicon-16x16.png`}
            sizes="16x16"
          />
          <link
            rel="manifest"
            href={`${process.env.RAW_ASSETS_URL}/favicon/manifest.json`}
          />
          <link
            rel="mask-icon"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/safari-pinned-tab.svg`}
            color="#ffffff"
          />
          <link
            rel="shortcut icon"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/favicon.ico`}
          />
          <meta name="theme-color" content="#000" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
            {
              "@type": "WebPage",
              "url": "${this.props.url ||
                `https://zeit.co${this.props.router.asPath}` ||
                'https://zeit.co/docs'}",
              "headline": "${this.props.ogTitle ||
                this.props.title ||
                'ZEIT Documentation'}",
              ${
                this.props.description
                  ? '"description": "' + this.props.description + '",'
                  : null
              }
              "image": "${this.props.image ||
                `${process.env.IMAGE_ASSETS_URL}/zeit/twitter-card.png`}",
              "name": "${titlePrefix +
                (this.props.ogTitle ||
                  this.props.title ||
                  'ZEIT Documentation') +
                titleSuffix}",
              "dateModified": "${
                this.props.lastEdited ? this.props.lastEdited : null
              }",
              "lastReviewed": "${
                this.props.lastEdited ? this.props.lastEdited : null
              }",
              "author": {
                "@type": "Person",
                "name": "ZEIT"
              },
              "publisher": {
                "@type": "Organization",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${`${
                    process.env.IMAGE_ASSETS_URL
                  }/favicon/favicon-96x96.png`}"
                },
                "name": "ZEIT"
              },
              "@context": "http:\/\/schema.org"
            }
          `
            }}
          />

          {this.props.children}
        </NextHead>
        <style jsx global>
          {`
            #nprogress {
              pointer-events: none;
            }
            #nprogress .bar {
              position: fixed;
              z-index: 2000;
              top: 0;
              left: 0;
              width: 100%;
              height: 2px;
            }
            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0px;
              width: 100px;
              height: 100%;
              opacity: 1;
              transform: rotate(3deg) translate(0px, -4px);
            }
          `}
        </style>
        <style jsx global>
          {`
            #nprogress .bar {
              background: ${darkBg ? '#fff' : '#000'};
            }

            #nprogress .peg {
              box-shadow: ${darkBg
                ? '0 0 10px #fff, 0 0 5px #fff'
                : '0 0 10px #ccc, 0 0 5px #ccc'};
            }
          `}
        </style>
      </div>
    )
  }
}

Head.contextTypes = {
  darkBg: PropTypes.bool
}

export default withRouter(Head)
