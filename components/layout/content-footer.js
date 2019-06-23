import { GenericLink } from '~/components/text/link'
import formatDate from 'date-fns/format'

const ContentFooter = ({ lastEdited, editUrl }) => (
  <footer>
    <span>Last Edited on {formatDate(lastEdited, 'MMMM Do YYYY')}</span>
    <GenericLink href={`https://github.com/zeit/docs/edit/master/${editUrl}`}>
      Edit This Page on GitHub
    </GenericLink>

    <style jsx>{`
      footer {
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        padding: 24px 0;
        font-size: 12px;
        color: #666666;
      }

      @media (max-width: 400px) {
        footer {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-bottom: 48px;
        }

        footer > span {
          margin-bottom: 16px;
        }
      }
    `}</style>
  </footer>
)

export default ContentFooter
