import { Code } from '~/components/text/code'

export default function Preview(props) {
  return (
    <div className="preview">
      <Code lang="bash">{`curl -X POST https://api.zeit.co/v9/now/deployments \\
-H "Authorization: Bearer ${props.testingToken || '<TOKEN>'}" \\
-d '${(props.content || '').replace(/'/g, "\\'")}'`}</Code>

      <style jsx>{`
        .preview :global(pre) {
          margin-top: 0;
        }

        .preview {
          box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.12);
        }

        @media screen and (max-width: 700px) {
          .preview {
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
}

Preview.defaultProps = {
  files: null
}
