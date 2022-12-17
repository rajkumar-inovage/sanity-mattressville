import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'html-react-parser'

import FormatDate from '~/components/functions/format-date'

const Main = ({
  authorName,
  articleTitle,
  articleContent,
  articleImage,
  articleDate,
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [setLoaded])

  return (
    <div className={'blogs-main'}>
      <div className={'d-flex'}>
        <h1 className={'main-heading'}>{articleTitle}</h1>
      </div>
      <div className={'d-flex justify-content-between'}>
        <p>
          Posted by <strong>{authorName}</strong>
        </p>
        <p>
          Posted on: <strong>{FormatDate(articleDate, 'MMM dd, yyyy')}</strong>
        </p>
      </div>
      <div className={'d-flex mb-4 justify-content-center'}>
        <img
          loading={'lazy'}
          src={articleImage.url}
          alt={articleTitle}
          className={'article-img'}
        />
      </div>
      {loaded && (
        <div className={'content mb-4'}>{ReactHtmlParser(articleContent)}</div>
      )}
    </div>
  )
}

export default Main
