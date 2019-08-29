import cn from 'classnames'
import ZenContext from '~/lib/zen-context'

const getContent = (zenModeActive, children) => {
  return (
    <div className={cn('content', zenModeActive ? 'content-zen-mode' : '')}>
      {children}
      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          flex: 0 0 100%;
          padding-bottom: 64px;
        }

        :global(.sidebar) + .content {
          margin-left: auto;
          max-width: calc(100% - 280px);
          padding-left: 24px;
        }

        .content-zen-mode {
          padding-left: 0;
        }

        @media screen and (max-width: 950px) {
          :global(.sidebar) + .content,
          .content {
            padding-left: 0;
            margin-left: 0;
            max-width: 100%;
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
