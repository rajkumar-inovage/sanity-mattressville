import React from 'react'

import Sidebar from './sidebar'
import Main from './main'
import Cta from './cta'

const ShopifyArticleContent = ({
  blogTitle,
  title,
  contentHtml,
  image,
  authorName,
  articleDate,
}) => {
  return (
    <section className={'blog'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar blogTitle={blogTitle} />
          </div>
          <div className={'flex-grow-1'}>
            <Main
              articleTitle={title}
              articleContent={contentHtml}
              articleImage={image}
              authorName={authorName}
              articleDate={articleDate}
            />
          </div>
        </div>
      </div>
      <Cta />
    </section>
  )
}

export default ShopifyArticleContent
