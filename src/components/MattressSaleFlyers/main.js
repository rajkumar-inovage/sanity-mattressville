import React from 'react'
import ReactHtmlParser from 'html-react-parser'
//import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Gallery from '@browniebroke/gatsby-image-gallery'

const Main = ({
  articleTitle,
  articleContent,
  articleImage,
  authorName,
  articleDate,
}) => {
  return (
    <div className={'flex-grow-1'}>
      <div className={'product-main'}>
        <h1 className={'main-heading'}>Mattress Sale Flyers</h1>
        <div className={'header-box flyer-sale-btn'}>
          <Link to={`/local-flyer/current-local-flyer`}>GTA Flyer</Link>
          <Link to={`/canada-flyer/canada-wide-flyer`}>Canada Wide Flyer</Link>
        </div>
        <div>
          <h2 className={'text-center mb-3'}>{articleTitle}</h2>
          <div>{ReactHtmlParser(articleContent)}</div>
          <div className={'row justify-content-center mb-5'}>
            <div className={'col-7'}>
              <Gallery
                colWidth={100}
                mdColWidth={100}
                rowMargin={0}
                gutter={0}
                images={[
                  {
                    ...articleImage.localImage.childImageSharp,
                    thumbAlt: 'flyer-1',
                  },
                ]}
                imgClass={'c-zoom-in'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
