import Button from '~/components/buttons'
import { Code, InlineCode } from '~/components/text/code'

export default function Preview(props) {
  return (
    <div className="preview">
      <Code lang="shell">{`curl -X POST https://api.zeit.co/v3/now/deployments \\
-H "Authorization: Bearer <TOKEN>" \\
-d '${(props.content || '').replace(/'/g, "\\'")}'`}</Code>
      {props.errorMessage ? (
        <div className="error-message" key="2">
          <span /> {props.errorMessage}.
        </div>
      ) : null}
      <div className="centered">
        <Button onClick={props.deploy} disabled={!!props.deploying}>
          DEPLOY NOW
        </Button>
      </div>
      <p>
        You can <InlineCode>curl</InlineCode> the URL or click on DEPLOY NOW to
        see it live
      </p>

      <style jsx>{`
        .centered {
          text-align: center;
        }
        .error-message {
          color: red;
          font-size: 12px;
          width: 100%;
          text-align: center;
          margin-bottom: 15px;
        }
        .error-message span {
          position: relative;

          padding-left: 20px;
        }
        .error-message span::before {
          display: block;
          content: '';
          width: 11px;
          background: red;
          height: 11px;
          position: absolute;
          left: 0;
          top: 1px;
        }
        p {
          font-size: 12px;
          text-align: center;
          margin: 25px 0;
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
  files: null,
  errorMessage: null,
  deploying: false
}
