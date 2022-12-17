import React from 'react'

import ArticlePageSidebar from './articlePageSidebar'
// import Main from './main'
import Main from './main'
import Cta from './cta'

const Flyers = ({
  blogTitle,
  title,
  contentHtml,
  image,
  authorName,
  articleDate,
}) => {
  return (
    <section className={'flyer'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <ArticlePageSidebar />
          </div>
          <Main
            articleTitle={title}
            articleContent={contentHtml}
            articleImage={image}
            authorName={authorName}
            articleDate={articleDate}
          />
        </div>
      </div>
      <Cta />
    </section>
  )
}

export default Flyers
