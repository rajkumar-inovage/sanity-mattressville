import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectCoverflow, Lazy, Navigation } from 'swiper'
// import { GatsbyImage } from 'gatsby-plugin-image'

import GSIcon from '~/components/gs-icon'
import isBrowser from '~/components/functions/is-browser'

SwiperCore.use([Autoplay, EffectCoverflow, Lazy, Navigation])
const BannerSlider = ({
  bannerSlider,
  bannerSlider: [
    {
      image: { localImage: firstImage, url: firstImageUrl },
    },
  ],
}) => {
  const [bannerSlides, setBannerSlides] = useState([])

  useEffect(() => {
    if (isBrowser) {
      bannerSlider &&
        setBannerSlides(
          bannerSlider.map(
            (
              {
                image: {
                  url,
                  localImage: {
                    childImageSharp: {
                      gatsbyImageData: { width, height },
                    },
                  },
                },
                link,
                title,
              },
              index
            ) => (
              <SwiperSlide key={index}>
                {({
                  isActive,
                  // isNext,
                  // isPrev,
                }) =>
                  isActive && (
                    <Link
                      to={link}
                      title={title}
                      className={'slide-link'}
                      style={{ backgroundImage: `url(${url})` }}
                    />
                  )
                }
              </SwiperSlide>
            )
          )
        )
    }
  }, [bannerSlider])

  return (
    <div className={'flex-grow-1 text-xl-left text-center banner-slider'}>
      {firstImage && bannerSlides.length === 0 && (
        <img
          src={firstImageUrl}
          alt={`firstImage`}
          width={firstImage.childImageSharp.gatsbyImageData.width}
          height={firstImage.childImageSharp.gatsbyImageData.height}
          className={'first-image img-fluid'}
        />
      )}
      {bannerSlides && bannerSlides.length > 0 && (
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          lazy={true}
          navigation={{
            prevEl: '.banner-slider .slider-nav .btn-left',
            nextEl: '.banner-slider .slider-nav .btn-right',
          }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {bannerSlides}
        </Swiper>
      )}
      {bannerSlides && bannerSlides.length > 0 && (
        <div className={'slider-nav'}>
          <button className={'btn-swiper btn-left'} aria-label={'Slide Left'}>
            <GSIcon icon={'gs-chevron-left'} />
          </button>
          <button className={'btn-swiper btn-right'} aria-label={'Slide Right'}>
            <GSIcon icon={'gs-chevron-right'} />
          </button>
        </div>
      )}
    </div>
  )
}

export default BannerSlider
