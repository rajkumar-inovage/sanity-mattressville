import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Seo from '~/components/seo'
import GetPrice from '~/components/functions/get-price'

const ArticlePage = ({
  data: {
    page: {
      pageInfo: { currentPage, hasNextPage, hasPreviousPage, pageCount },
      products,
    },
  },
  pageContext: { ogPath },
}) => {
  return (
    <Fragment>
      <Seo
        title={'Shop for our all available products'}
        description={
          'This one stop shop for our all available products including premium mattresses, pillow, bed base and other sleep accessories so you can enjoy a nice sleep.'
        }
        ogPath={ogPath}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Shop for our all available products',
          description:
            'This one stop shop for our all available products including premium mattresses, pillow, bed base and other sleep accessories so you can enjoy a nice sleep.',
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <section className="shopify-page">
        <div className="entry-header">
          <div className="container-fluid">
            <h1>Shop for our all available products</h1>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className={'row'}>
              {products.map((product, index) => (
                <div key={index} className={'col-md-4'}>
                  <Link
                    to={`/products/${product.handle}/`}
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <div className={'card p-4 text-center'}>
                      <GatsbyImage
                        image={
                          product.images[0].localFile.childImageSharp
                            .gatsbyImageData
                        }
                        alt={product.images[0].altText}
                      />
                      <h5>{product.title}</h5>
                      <h4
                        className={'item-price'}
                        style={{
                          color: '#ff5c7b',
                        }}
                      >
                        {GetPrice(product.priceRangeV2.minVariantPrice.amount)}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className={'d-flex justify-content-center'}>
              <nav aria-label={'All Products Pagination'}>
                <ul className={'pagination'} style={{ gap: '10px' }}>
                  {hasPreviousPage && (
                    <li className={'page-item'}>
                      <Link
                        className={'page-link'}
                        to={`/products/all/page/${currentPage - 1}/`}
                        style={{
                          alignItems: 'center',
                          borderRadius: '50%',
                          borderColor: '#ff5c7b',
                          color: '#ff5c7b',
                          display: 'flex',
                          justifyContent: 'center',
                          height: 48,
                          width: 48,
                        }}
                      >
                        ⮜
                      </Link>
                    </li>
                  )}
                  {Array.from(
                    {
                      length: Math.ceil(pageCount),
                    },
                    (_, i) => i + 1
                  ).map((page, index) => (
                    <li className={'page-item'} key={index}>
                      {page === currentPage ? (
                        <span
                          className={'page-link'}
                          style={{
                            alignItems: 'center',
                            borderRadius: '50%',
                            borderColor: '#ff5c7b',
                            backgroundColor: '#ff5c7b',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            height: 48,
                            width: 48,
                          }}
                        >
                          {page}
                        </span>
                      ) : (
                        <Link
                          className={'page-link'}
                          to={`/products/all/page/${page}/`}
                          style={{
                            alignItems: 'center',
                            borderRadius: '50%',
                            borderColor: '#ff5c7b',
                            color: '#ff5c7b',
                            display: 'flex',
                            justifyContent: 'center',
                            height: 48,
                            width: 48,
                          }}
                        >
                          {page}
                        </Link>
                      )}
                    </li>
                  ))}
                  {hasNextPage && (
                    <li className={'page-item'}>
                      <Link
                        className={'page-link'}
                        to={`/products/all/page/${currentPage + 1}/`}
                        style={{
                          alignItems: 'center',
                          borderRadius: '50%',
                          borderColor: '#ff5c7b',
                          color: '#ff5c7b',
                          display: 'flex',
                          justifyContent: 'center',
                          height: 48,
                          width: 48,
                        }}
                      >
                        ⮞
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default ArticlePage

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    page: allShopifyProduct(limit: $limit, skip: $skip) {
      products: nodes {
        handle
        title
        tags
        createdAt
        publishedAt
        productType
        vendor
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                transformOptions: { cropFocus: CENTER }
                height: 170
                width: 258
                placeholder: DOMINANT_COLOR
              )
            }
          }
        }
        metafields {
          key
          namespace
          value
        }
      }
      pageInfo {
        perPage
        pageCount
        itemCount
        currentPage
        hasNextPage
        hasPreviousPage
        totalCount
      }
    }
  }
`
