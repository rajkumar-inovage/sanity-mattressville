import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Swiper, SwiperSlide } from 'swiper/react'

import RelatedProductBox from './related-product-box'

const GET_RECOMMENDED_PRODUCTS = gql`
  query GET_RECOMMENDED_PRODUCTS($productId: ID!) {
    productRecommended: productRecommendations(productId: $productId) {
      handle
      title
      tags
      productType
      vendor
      variants(first: 250) {
        edges {
          node {
            title
            priceV2 {
              amount
            }
            compareAtPriceV2 {
              amount
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      card_features: metafield(key: "card_features", namespace: "meta_data") {
        value
      }
      images(first: 25) {
        edges {
          node {
            altText
            url
            transformedSrc: url(
              transform: { crop: CENTER, maxHeight: 170, maxWidth: 258 }
            )
          }
        }
      }
    }
  }
`

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]),
    { loading } = useQuery(GET_RECOMMENDED_PRODUCTS, {
      variables: {
        productId,
      },
      onCompleted: data => {
        if (data && data.productRecommended) {
          setRelatedProducts(data.productRecommended)
        }
      },
    })

  return (
    !loading &&
    relatedProducts &&
    relatedProducts.length > 0 && (
      <div className={'related-products'}>
        <div className={'container-fluid'}>
          <div className={'title-area'}>
            <h4>Related Products</h4>
          </div>
          <div className={'products'}>
            <Swiper
              spaceBetween={10}
              slidesPerView={1.11}
              breakpoints={{
                376: { slidesPerView: 1.2 },
                480: { slidesPerView: 1.5 },
                576: { slidesPerView: 1.8 },
                768: { slidesPerView: 2.3 },
                1024: { slidesPerView: 3.3 },
                1200: { spaceBetween: 20, slidesPerView: 4 },
              }}
            >
              {relatedProducts.map((product, i) =>
                product.id !== productId ? (
                  <SwiperSlide key={i}>
                    <RelatedProductBox product={product} />
                  </SwiperSlide>
                ) : (
                  false
                )
              )}
            </Swiper>
          </div>
        </div>
      </div>
    )
  )
}

export default RelatedProducts
