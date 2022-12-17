import React, { Fragment } from 'react'
import Seo from '~/components/seo'

const NotFoundPage = () => (
  <Fragment>
    <Seo
      title={'404: Not found'}
      schemaMarkup={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '404: Not found',
        description: 'The page you are looking for can not be found',
        publisher: {
          '@type': 'Organization',
          name: 'Mattressville',
        },
      }}
    />
    <br />
    <br />
    <div className={'d-flex justify-content-center align-items-center my-5'}>
      <h1 className={'mr-3 pr-3 align-top border-right display-1'}>404</h1>
      <div className={'align-middle'}>
        <h2>The page you requested was not found.</h2>
        <span>Please try using our search to find the right page</span>
      </div>
    </div>
    <br />
    <br />
  </Fragment>
)

export default NotFoundPage
