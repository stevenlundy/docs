import cn from 'classnames'
import { Component } from 'react' 
import { HEADER_HEIGHT } from '~/lib/constants'
import ZenContext from '~/lib/zen-context'

class Sidebar extends Component {
  static contextType = ZenContext

  render() {
    const { active, children, innerRef } = this.props
    return (
      <>
        {!this.context && (
          <aside className={cn('sidebar', { active })} ref={innerRef}>
            {children}
            <style jsx>{`
              .sidebar {
                background: #fff;
                bottom: 0;
                padding-bottom: 40px;
                padding-right: 24px;
                padding-top: 40px;
                position: fixed;
                top: ${HEADER_HEIGHT}px;
                width: 280px;
                z-index: 1;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
              }

              @media screen and (max-width: 950px) {
                .sidebar {
                  border-right: 0;
                  display: none;
                  left: 0;
                  padding: 40px 24px;
                  right: 0;
                  width: 100%;
                }

                .sidebar.active {
                  display: block;
                }
              }
            `}</style>
          </aside>
        )}
      </>
    )
  }
}

export default Sidebar
