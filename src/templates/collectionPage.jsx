import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import ProductCategory from '~/components/ProductCategory'

const CollectionPage = ({
  data: {
    store: { collection },
  },
  pageContext,
}) => {
  const { ogPath } = pageContext,
    ogImage = pageContext?.image?.url,
    title =
      collection.seo.title !== null ? collection.seo.title : collection.title

  return (
    <Fragment>
      <Seo
        title={title.length > 40 ? `${title.slice(0, 40)}...` : title}
        description={
          collection.seo.description !== null
            ? collection.seo.description.slice(0, 150)
            : collection.description.slice(0, 150)
            ? collection.description.slice(0, 150)
            : `Mattressville's ${title} to choose for your best sleep, keep on exploring, we will bring you best offers there is.`
        }
        ogPath={ogPath}
        ogImage={ogImage ?? collection?.image?.url}
        schemaMarkup={{
          '@context': 'http://schema.org',
          '@type': 'CollectionPage',
          name:
            collection.seo.title !== null
              ? collection.seo.title
              : collection.title,
          url: `${
            process.env.NODE_ENV === 'development'
              ? `http://localhost:8000`
              : `https://mattressville.ca`
          }/${
            collection.handle.includes('accessories')
              ? `accessories`
              : collection.handle.includes('brand')
              ? `brands`
              : `all-mattresses`
          }/${collection.handle}`,
          description:
            collection.seo.description !== null
              ? collection.seo.description.slice(0, 150)
              : collection.description.slice(0, 150)
              ? collection.description.slice(0, 150)
              : `Mattressville's ${title} to choose for your best sleep, keep on exploring, we will bring you best offers there is.`,
          ...(ogImage || collection?.image
            ? {
                image: ogImage ?? collection?.image?.url,
              }
            : {}),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: collection.products.nodes.map(({ handle }, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${
                process.env.NODE_ENV === 'development'
                  ? `http://localhost:8000/`
                  : `https://mattressville.ca/`
              }/products/${handle}`,
            })),
          },
        }}
      />
      <ProductCategory collectionData={collection} />
    </Fragment>
  )
}

export default CollectionPage

export const query = graphql`
  query ($id: ID!) {
    store {
      collection(id: $id) {
        id
        title
        handle
        description(truncateAt: 145)
        descriptionHtml
        products(first: 9) {
          nodes {
            handle
          }
        }
        image {
          altText
          url
          localImage {
            childImageSharp {
              gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
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
