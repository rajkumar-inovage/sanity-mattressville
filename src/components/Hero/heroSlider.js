import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

import GSIcon from '~/components/gs-icon'
import isBrowser from '~/components/functions/is-browser'

SwiperCore.use([Navigation])

const HeroSlider = ({ slides }) => {
  const [brandSlides, updateBrandSlides] = useState([])

  useEffect(() => {
    if (isBrowser) {
      slides &&
        updateBrandSlides(
          slides.map(
            (
              {
                link,
                image: {
                  childImageSharp: {
                    gatsbyImageData: {
                      images: {
                        fallback: { src },
                      },
                      height,
                      width,
                    },
                  },
                },
              },
              index
            ) => (
              <SwiperSlide key={index}>
                <Link
                  to={link}
                  className={'slide-link'}
                  style={{
                    backgroundImage: `url(${src})`,
                    height: `${height}px`,
                    width: `${width}px`,
                  }}
                />
              </SwiperSlide>
            )
          )
        )
    }
  }, [slides, updateBrandSlides])

  return (
    <section className={'clients'}>
      <div className={'container-fluid'}>
        {brandSlides.length > 0 && (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.clients .slider-nav .prev',
              nextEl: '.clients .slider-nav .next',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              375: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1200: {
                spaceBetween: 30,
                slidesPerView: 5,
              },
            }}
          >
            {brandSlides}
          </Swiper>
        )}
        {false && brandSlides.length > 0 && (
          <div className={'slider-nav'}>
            <button className={'btn-swiper prev'} aria-label={'Slide Left'}>
              <GSIcon icon={'gs-chevron-left'} />
            </button>
            <button className={'btn-swiper next'} aria-label={'Slide Right'}>
              <GSIcon icon={'gs-chevron-right'} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSlider
