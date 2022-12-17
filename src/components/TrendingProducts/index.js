import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import ProductBox from './product-box'
import { Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'

import GSIcon from '~/components/gs-icon'
import isBrowser from '~/components/functions/is-browser'
import useOnScreen from '~/components/functions/useOnScreen'

const TrendingProducts = ({
  data: {
    title,
    explore,
    productsData: { products },
    emptyMsg,
  },
}) => {
  const productsRef = useRef(),
    [trendingProducts, updateTrendingProducts] = useState([]),
    [loadedOnce, setLoadedOnce] = useState(false),
    visible = useOnScreen(productsRef)

  useEffect(() => {
    if (isBrowser) {
      products &&
        updateTrendingProducts(
          products.map(({ product }, i) => {
            return (
              <SwiperSlide key={i}>
                <ProductBox product={product} />
              </SwiperSlide>
            )
          })
        )
      !loadedOnce && setLoadedOnce(visible)
    }
  }, [products, updateTrendingProducts, loadedOnce, visible])

  return (
    <section className={'product-grid'}>
      <Container fluid={true}>
        <div className={'entry-data d-flex align-items-center'}>
          <h2 className="title">{title}</h2>
          <Link to={explore.link} className={'explore-link'}>
            <span>{explore.label}</span> <GSIcon icon={'gs-chevron-right'} />
          </Link>
        </div>
        <div className={'products'} ref={productsRef}>
          {(visible || loadedOnce) &&
            trendingProducts &&
            trendingProducts.length > 0 && (
              <Swiper
                spaceBetween={10}
                slidesPerView={1.11}
                breakpoints={{
                  376: { slidesPerView: 1.2 },
                  480: { slidesPerView: 1.5 },
                  576: { slidesPerView: 1.8 },
                  768: { slidesPerView: 2.3 },
                  1120: { slidesPerView: 3.3 },
                  1440: { spaceBetween: 20, slidesPerView: 4 },
                }}
              >
                {trendingProducts}
              </Swiper>
            )}
        </div>
      </Container>
    </section>
  )
}

export default TrendingProducts
