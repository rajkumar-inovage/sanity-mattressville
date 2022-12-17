import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import Product from '~/components/Product'
import getKeywords from '~/components/functions/get-keywords'

const ProductPage = ({
  data: {
    store: {
      product,
      product: {
        handle,
        vendor,
        images: {
          edges: [
            {
              node: {
                localImage: {
                  childImageSharp: {
                    gatsbyImageData: {
                      images: {
                        fallback: { src: ogImage },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  pageContext,
}) => {
  const { tags } = pageContext
  product.shopifyId = `Shopify__Product__${product.id}`

  return (
    <Fragment>
      <Seo
        title={product.seo.title !== null ? product.seo.title : product.title}
        description={
          product.seo.description !== null
            ? product.seo.description
            : product.description
        }
        keywords={getKeywords(tags)}
        ogPath={`/products/${handle}/`}
        ogImage={ogImage}
        schemaMarkup={{
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.seo.title !== null ? product.seo.title : product.title,
          image: [ogImage],
          description:
            product.seo.description !== null
              ? product.seo.description
              : product.description,
          brand: {
            '@type': 'Brand',
            name: vendor,
          },
        }}
      />
      <Product product={product} />
    </Fragment>
  )
}

export default ProductPage
// ! id had prefixed with "Shopify__Product__"
export const query = graphql`
  query ($handle: String!) {
    store {
      product(handle: $handle) {
        handle
        id
        tags
        title
        productType
        description(truncateAt: 145)
        descriptionHtml
        options {
          id
          name
          values
        }
        collections(first: 10) {
          edges {
            node {
              handle
              title
            }
          }
        }
        vendor
        totalInventory
        variants(first: 250) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
              }
              availableForSale
              sku
              weight
              weightUnit
              quantityAvailable
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
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        softness_score: metafield(
          key: "softness_score"
          namespace: "meta_data"
        ) {
          value
        }
        origin: metafield(key: "origin", namespace: "meta_data") {
          value
        }
        shipping_areas: metafield(
          key: "shipping_areas"
          namespace: "meta_data"
        ) {
          value
        }
        card_features: metafield(key: "card_features", namespace: "meta_data") {
          value
        }
        info_tab: metafield(key: "info_tab", namespace: "meta_data") {
          value
        }
        features_tab: metafield(key: "features_tab", namespace: "meta_data") {
          value
        }
        images(first: 250) {
          edges {
            node {
              altText
              url
              localImage {
                childImageSharp {
                  gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
                }
              }
            }
          }
        }
        seo {
          description
          title
        }
      }
    }
  }
`
