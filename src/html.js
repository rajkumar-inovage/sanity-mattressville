import React from 'react'
import PropTypes from 'prop-types'

const HTML = props => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet={'utf-8'} />
        <meta name="facebook-domain-verification" content="1kjyi0k72350a08dfogzn0mmn2biba" />
        <meta
          name={'viewport'}
          content={
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          }
        />
        <meta name="robots" content="index, follow"/>
        <meta name={'HandheldFriendly'} content={'true'} />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PWDN66V" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {props.preBodyComponents}
        <div
          key={`body`}
          id={'___gatsby'}
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

export default HTML
