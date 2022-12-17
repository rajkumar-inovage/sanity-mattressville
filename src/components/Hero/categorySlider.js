import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Swiper, SwiperSlide } from 'swiper/react'

import GSIcon from '~/components/gs-icon'
import isBrowser from '~/components/functions/is-browser'
import isTablet from '~/components/functions/is-tablet'

const CategorySlider = ({ header: { title, exploreLink }, slider }) => {
  const [categorySlides, updateCategorySlides] = useState([]),
    [categoryItems, updateCategoryItems] = useState([])
  useEffect(() => {
    if (isBrowser) {
      slider &&
        updateCategorySlides(
          slider.map(({ link, image, title }, index) => (
            <SwiperSlide key={index}>
              <div className={'px-xl-4'}>
                <div className={'category-content'}>
                  <Link to={link} className={'cat-link'}>
                    <div className={'category-image'}>
                      <img
                        loading={'lazy'}
                        src={
                          image.childImageSharp.gatsbyImageData.images.fallback
                            .src
                        }
                        alt={`category-${index + 1}`}
                        height={image.childImageSharp.gatsbyImageData.height}
                        width={image.childImageSharp.gatsbyImageData.width}
                      />
                    </div>
                    <h3>
                      {title} <GSIcon icon={'gs-chevron-right'} />
                    </h3>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))
        )
      slider &&
        updateCategoryItems(
          slider.map(({ link, image, title }, index) => (
            <div className={'px-xl-4'} key={index}>
              <div className={'category-content'}>
                <Link to={link} className={'cat-link'}>
                  <div className={'category-image'}>
                    <img
                      loading={'lazy'}
                      src={
                        image.childImageSharp.gatsbyImageData.images.fallback
                          .src
                      }
                      alt={`category-${index + 1}`}
                      height={image.childImageSharp.gatsbyImageData.height}
                      width={image.childImageSharp.gatsbyImageData.width}
                    />
                  </div>
                  <h3>
                    {title} <GSIcon icon={'gs-chevron-right'} />
                  </h3>
                </Link>
              </div>
            </div>
          ))
        )
    }
  }, [slider, updateCategorySlides])

  return (
    <div className={'category'}>
      <div className={'entry-data d-flex align-items-center'}>
        <h2 className={'title'}>{title}</h2>
        <Link to={exploreLink} className={'explore-link'}>
          <span>Explore More</span> <GSIcon icon={'gs-chevron-right'} />
        </Link>
      </div>
      {isTablet() ? (
        <div className={'categories-slider mx-xl-n4'}>
          {slider && slider.length > 0 && (
            <Swiper
              spaceBetween={10}
              slidesPerView={1.4}
              breakpoints={{
                576: {
                  slidesPerView: 1.8,
                },
                768: {
                  slidesPerView: 2.4,
                },
                850: {
                  slidesPerView: 2.8,
                },
                992: {
                  slidesPerView: 3,
                },
                1200: {
                  spaceBetween: 6,
                  slidesPerView: 4,
                },
              }}
            >
              {categorySlides}
            </Swiper>
          )}
        </div>
      ) : (
        <div className={'categories-grid mx-xl-n4'}>{categoryItems}</div>
      )}
    </div>
  )
}
export default CategorySlider
