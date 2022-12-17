import React from 'react'
import ReactHtmlParser from 'html-react-parser'

import Cta from './cta'

const ShopifyPageContent = ({ title, body }) => {
  return (
    <section className={'shopify-page'}>
      <div className={'entry-header'}>
        <div className={'container-fluid'}>
          <h1>{title}</h1>
        </div>
      </div>
      <div className={'content'}>
        <div className={'container-fluid'}>{ReactHtmlParser(body)}</div>
      </div>
      <Cta />
    </section>
  )
}

export default ShopifyPageContent
