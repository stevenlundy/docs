import { Component } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { FONT_FAMILY_SANS, SYNTAX_HIGHLIGHTING } from '~/lib/css-config'

export default class Page extends Component {
  static contextTypes = {
    darkBg: PropTypes.bool
  }

  static getChildContext() {
    return {
      darkBg: this.props.darkBg || false
    }
  }

  render() {
    return (
      <div className="page" itemScope itemType="http://schema.org/WebPage">
        {this.props.children}
        <style jsx global>{`
          html {
            height: 100%;
            box-sizing: border-box;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          a {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

          body {
            font-family: ${FONT_FAMILY_SANS};
            margin: 0;
            min-height: 100%;
            position: relative;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
          }

          html,
          body {
            background-color: ${this.props.darkBg ? '#000' : '#fff'};
            color: ${this.props.darkBg ? '#fff' : '#000'};
          }

          .page {
            margin: 0 auto;
            max-width: 100%;
            position: relative;
          }

          ::selection {
            background-color: #79ffe1;
            color: #000;
          }
        `}</style>
        <style jsx global>
          {SYNTAX_HIGHLIGHTING}
        </style>
      </div>
    )
  }
}
