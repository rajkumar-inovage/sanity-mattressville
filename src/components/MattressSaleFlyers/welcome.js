import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const Welcome = ({ data }) => {
  return (
    <div className={'flex-grow-1'}>
      <div className={'product-main'}>
        <h1 className={'main-heading'}>Mattress Sale Flyers</h1>
        <div className={'img-section'}>
          <GatsbyImage
            image={data.flyerImage.childImageSharp.gatsbyImageData}
            alt={data.flyerImageAlt}
            className={'flyer-image'}
          />
        </div>
        <div className={'description-section welcome-text text-center'}>
          <p>
            Check out what&apos;s on sale including seasonal sales, holiday
            mattress sales, and special events. Shop and save at Mattressville!
          </p>
          <div className={'welcome-btn'}>
            <Link to={`/local-flyer/current-local-flyer/`}>
            GTA Only Flyer
            </Link>
            <Link to={`/canada-flyer/canada-wide-flyer/`}>
              Canada Wide Flyer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
