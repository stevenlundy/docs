import { parse as parseURL } from 'url'

import { Code } from '../text/code'
import Context from '~/lib/api/slugs-context'

function formatCurl({ url, method = 'GET', headers, body }) {
  let request = `curl ${method !== 'GET' ? `-X ${method} ` : ''}"${url}"`

  if (headers && Object.keys(headers).length > 0) {
    request = Object.entries(headers).reduce((req, [key, value]) => {
      return req + ` \\\n  -H "${key}: ${value}"`
    }, request)
  }

  if (body) {
    if (typeof body !== 'string') {
      request = `${request} \\\n  -d '${JSON.stringify(body, null, 2)}'`
    } else {
      request = `${request} \\\n  -d '${body.replace(
        /(?:\\r\\n|\\r|\\n)/g,
        '\n'
      )}'`
    }
  }
  return request
}

function formatJS({ url, ...opts }) {
  return `await fetch("${url}", ${JSON.stringify(opts, null, 2)})`
}

function formatHTTP({ url, method = 'GET', headers, body }) {
  const { path, host } = parseURL(url)

  return [
    `${method} ${path} HTTP/1.1`,
    `Host: ${host}`,
    ...Object.entries(headers).map(([key, value]) => `${key}: ${value}`),
    JSON.stringify(body, null, 2)
  ].join('\n')
}

function RequestContent({ auth, req, type }) {
  const request = auth
    ? {
        ...req,
        headers: {
          // Authorization: `Bearer ${context.testingToken || '<TOKEN>'}`,
          Authorization: `Bearer <TOKEN>`,
          ...req.headers
        }
      }
    : { ...req }

  if (type === 'fetch' || type === 'js' || type === 'javascript') {
    return <Code lang="javascript">{formatJS(request)}</Code>
  }
  if (type === 'http') {
    return <Code lang="plain">{formatHTTP(request)}</Code>
  }
  return <Code lang="bash">{formatCurl(request)}</Code>
}

export default function Request({ auth, type = 'curl', ...req }) {
  return (
    <Context.Consumer>
      {ctx => (
        <RequestContent auth={auth} req={req} context={ctx} type={type} />
      )}
    </Context.Consumer>
  )
}
