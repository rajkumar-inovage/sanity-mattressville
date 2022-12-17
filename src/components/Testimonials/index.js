import React, { useEffect, useRef, useState } from 'react'
import ReactHtmlParser from 'html-react-parser'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from 'swiper'
import { Container } from 'react-bootstrap'
import Star from '~/components/icons/star'

import GSIcon from '~/components/gs-icon'
import isBrowser from '~/components/functions/is-browser'
import useOnScreen from '~/components/functions/useOnScreen'

SwiperCore.use([Navigation, Pagination, EffectCoverflow])

const Testimonials = ({
  data: { mobtitle1, mobtitle2, title, bgImage, bgAltText, customerSay },
}) => {
  const [TestimonialSlider, updateTestimonialSlider] = useState([]),
    [loadedOnce, setLoadedOnce] = useState(false),
    sectionRef = useRef(),
    visible = useOnScreen(sectionRef, '100px')

  useEffect(() => {
    if (isBrowser) {
      customerSay &&
        updateTestimonialSlider(
          customerSay.map(({ title, subtitle, desc, reviewers, icon }, i) => {
            return (
              <SwiperSlide key={i}>
                <div className={'top-area d-flex'}>
                  <img
                    alt={title}
                    loading={'lazy'}
                    src={
                      icon.childImageSharp.gatsbyImageData.images.fallback.src
                    }
                    className={'my-auto'}
                    height={icon.childImageSharp.gatsbyImageData.height}
                    width={icon.childImageSharp.gatsbyImageData.width}
                  />
                  <div className={'d-flex flex-column'}>
                    <h3 className={'my-auto'}>{title}</h3>
                    {subtitle && ReactHtmlParser(subtitle)}
                  </div>
                </div>
                <div className={'star d-flex justify-content-center'}>
                  {Array.from({ length: 5 }, (_, i) => i + 1).map(value => (
                    <Star
                      key={value}
                      width={24}
                      height={23}
                      className={'my-auto star-icon'}
                    />
                  ))}
                </div>
                <div className={'desc'}>
                  {desc && ReactHtmlParser(desc)}
                  <div className={'meta-data d-flex justify-content-between'}>
                    <div className={'name-meta'}>{reviewers}</div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        )
      !loadedOnce && setLoadedOnce(visible)
    }
  }, [customerSay, updateTestimonialSlider, loadedOnce, visible])

  return (
    <section ref={sectionRef} className={'testimonials'}>
      {(visible || loadedOnce) && (
        <Container fluid={true}>
          <div className={'entry-data d-flex align-items-left'}>
            <h2 className="d-block d-md-none mob-title">
              {mobtitle1} <br /> {mobtitle2}
            </h2>
            <h2 className="d-none d-md-block title">{title}</h2>
          </div>
          <div className={'testimonials-inner'}>
            <div className={'d-flex'}>
              <img
                loading={'lazy'}
                src={
                  bgImage.childImageSharp.gatsbyImageData.images.fallback.src
                }
                alt={bgAltText}
                className={'testimonial-bg'}
                height={bgImage.childImageSharp.gatsbyImageData.height}
                width={bgImage.childImageSharp.gatsbyImageData.width}
              />
            </div>
            <div className={'testimonial-data'}>
              {TestimonialSlider.length > 0 && (
                <Swiper
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1.15}
                  rewind={true}
                  navigation={{
                    nextEl: '.testimonial-data .slider-nav .swiper-right',
                    prevEl: '.testimonial-data .slider-nav .swiper-left',
                  }}
                  breakpoints={{
                    992: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {TestimonialSlider}
                </Swiper>
              )}
              <div className={'slider-nav'}>
                <button
                  className={'btn-swiper swiper-left'}
                  aria-label={'Slide Left'}
                >
                  <GSIcon icon={'gs-chevron-left'} />
                </button>
                <button
                  className={'btn-swiper swiper-right'}
                  aria-label={'Slide Right'}
                >
                  <GSIcon icon={'gs-chevron-right'} />
                </button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  )
}

export default Testimonials
