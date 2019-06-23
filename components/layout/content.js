import cn from 'classnames'
import ZenContext from '~/lib/zen-context'

const getContent = (zenModeActive, children) => {
  return (
    <div className={cn(zenModeActive ? 'content-zen-mode' : '')}>
      {children}
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          flex: 1;
          max-width: 100%;
          padding-left: calc(280px + 40px);
          padding-bottom: 128px;
        }

        .content-zen-mode {
          padding-left: 0;
        }

        @media screen and (max-width: 950px) {
          div {
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  )
}

const Content = ({ children }) => (
  <ZenContext.Consumer>
    {zenModeActive => getContent(zenModeActive, children)}
  </ZenContext.Consumer>
)

export default Content
