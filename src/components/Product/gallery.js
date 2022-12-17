import React, { useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs } from 'swiper/core'
import { Modal } from 'react-bootstrap'

import FullScreen from '~/components/icons/full-screen'
import GSIcon from '~/components/gs-icon'

SwiperCore.use([Thumbs])

const Gallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null),
    [gallerySwiper, setGallerySwiper] = useState(null),
    [activeIndex, setActiveIndex] = useState(0),
    [showGallery, setShowGallery] = useState(false)

  return images && images.length ? (
    <div className={'gallery'}>
      <div className={'wrap'}>
        <button
          type={'button'}
          className={'btn-full-screen'}
          aria-label={'Full Screen'}
          onClick={() => setShowGallery(true)}
        >
          <FullScreen width={26} height={26} />
        </button>
        <div className={'sliders'}>
          <div className={'mainSwiper'}>
            <Swiper
              loop={true}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              onSwiper={swiper => {
                setGallerySwiper(swiper)
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <GatsbyImage
                    image={
                      image.node.localImage.childImageSharp.gatsbyImageData
                    }
                    alt={'product-image'}
                    className={'image'}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={'slider-nav'}>
              <button
                className={'btn-swiper btn-left'}
                aria-label={'Slide Left'}
                onClick={() => {
                  gallerySwiper.slidePrev()
                  setActiveIndex(gallerySwiper.realIndex)
                }}
              >
                <GSIcon icon={'gs-chevron-left'} />
              </button>
              <button
                className={'btn-swiper btn-right'}
                aria-label={'Slide Right'}
                onClick={() => {
                  gallerySwiper.slideNext()
                  setActiveIndex(gallerySwiper.realIndex)
                }}
              >
                <GSIcon icon={'gs-chevron-right'} />
              </button>
            </div>
          </div>
          <Swiper
            loop={true}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={images.length > 2 ? 3 : images.length}
            freeMode={true}
            watchSlidesProgress={true}
            className="thumbSwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <GatsbyImage
                  image={image.node.localImage.childImageSharp.gatsbyImageData}
                  alt={'product-image'}
                  className={'image-thumb'}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Modal
        className={'gallery-modal'}
        show={showGallery}
        onHide={() => setShowGallery(false)}
        centered={true}
      >
        <Modal.Body>
          <button
            type={'button'}
            className={'btn-dismiss'}
            onClick={() => setShowGallery(false)}
          >
            <GSIcon icon={'gs-x'} />
          </button>
          <div
            className={'d-flex h-100 align-items-center justify-content-center'}
          >
            {images[activeIndex] && (
              <GatsbyImage
                image={
                  images[activeIndex].node.localImage.childImageSharp
                    .gatsbyImageData
                }
                alt={'product-image'}
                className={'modal-image'}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  ) : null
}

export default Gallery
