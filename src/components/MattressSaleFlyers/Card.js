import React from 'react'
import ReactHtmlParser from 'html-react-parser'
import { GatsbyImage } from 'gatsby-plugin-image'

const Card = ({ flyerImg, heading, description }) => {
  return (
    <div className={'card-container'}>
      <div className={'row no-gutters'}>
        <div className={'col-xl-7 col-12'}>
          <div
            className={'d-flex h-100 align-items-center justify-content-center'}
          >
            <GatsbyImage
              image={flyerImg.localImage.childImageSharp.gatsbyImageData}
              alt={heading}
              className={'cashcoupon-img'}
            />
          </div>
        </div>
        <div className={'col-xl-5 col-12'}>
          <div className={'card-content'}>
            <h2 className={'card-heading'}>{heading}</h2>
            {description && ReactHtmlParser(description)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
