import Document_, { Html, Head, Main, NextScript } from 'next/document'
import { GA_ID } from '../lib/metrics'

export default class Document extends Document_ {
  render() {
    const { amphtml } = this.props
    return (
      <Html lang="en">
        <Head>
          {amphtml && (
            <script
              async
              key="amp-analytics"
              custom-element="amp-analytics"
              src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
            />
          )}
        </Head>
        <body>
          <Main />
          {amphtml ? (
            <>
              <amp-analytics type="gtag" data-credentials="include">
                <script
                  type="application/json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      vars: {
                        gtag_id: GA_ID,
                        config: {
                          [GA_ID]: { groups: 'default' }
                        }
                      }
                    })
                  }}
                />
              </amp-analytics>
            </>
          ) : (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                  `
                }}
              />
            </>
          )}
          <NextScript />
        </body>
      </Html>
    )
  }
}
