import Document_, { Html, Head, Main, NextScript } from 'next/document'
import { GA_ID } from '../lib/metrics'
import { useAmp } from 'next/amp'

function AmpWrap({ ampOnly, nonAmp }) {
  const isAmp = useAmp()
  if (ampOnly) return isAmp && ampOnly
  return !isAmp && nonAmp
}

export default class Document extends Document_ {
  render() {
    return (
      <Html lang="en">
        <Head>
          <AmpWrap
            ampOnly={
              <>
                <script
                  async
                  key="amp-analytics"
                  custom-element="amp-analytics"
                  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
                />
                <script
                  async
                  key="amp-bind"
                  custom-element="amp-bind"
                  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
                />
                <script
                  async
                  key="amp-form"
                  custom-element="amp-form"
                  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
                />
              </>
            }
          />
        </Head>
        <body>
          <Main />
          <AmpWrap
            ampOnly={
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
            }
          />
          <AmpWrap
            nonAmp={
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
            }
          />
          <NextScript />
        </body>
      </Html>
    )
  }
}
