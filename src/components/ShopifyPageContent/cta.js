import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import BlogPageData from '~/components/constants/pages/blog-page-data'
import Bed from '../icons/bed'

const Cta = () => {
  const {
    ctaData: { leftArea, rightArea },
  } = BlogPageData()

  return (
    <div className={'cta-section'}>
      <div className={'container-fluid'}>
        <div
          className={'d-flex justify-content-center flex-lg-row flex-column'}
        >
          <div>
            <Link to={leftArea.link} className={'cta-left'}>
              <GatsbyImage
                image={leftArea.image.childImageSharp.gatsbyImageData}
                alt={leftArea.alt}
                className={'left-area-img'}
              />
              <span className={'label'}>{leftArea.label}</span>
            </Link>
          </div>

          <div>
            <Link to={rightArea.link} className={'cta-right'}>
              <Bed width={190} height={110} />
              <span className={'label'}>{rightArea.label}</span>
              <span className={'label'}>{rightArea.secondLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cta
