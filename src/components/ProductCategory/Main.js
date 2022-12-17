import React, { useState } from 'react'

import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactHtmlParser from 'html-react-parser'

import ArrLeft from '~/components/icons/arr-left'
import ArrRight from '~/components/icons/arr-right'
import getQueenVariant from '~/components/functions/get-queen-variant'
import ProductBox from './product-box'

const GET_COLLECTION_PRODUCTS = gql`
  query GET_COLLECTION_PRODUCTS(
    $handle: String!
    $first: Int
    $last: Int
    $sortKey: ProductCollectionSortKeys
    $before: String
    $after: String
    $reverse: Boolean
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      result: products(
        first: $first
        last: $last
        after: $after
        before: $before
        reverse: $reverse
        sortKey: $sortKey
        filters: $filters
      ) {
        products: edges {
          cursor
          product: node {
            handle
            title
            tags
            createdAt
            publishedAt
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
            priceRange {
              minVariantPrice {
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
            card_features: metafield(
              key: "card_features"
              namespace: "meta_data"
            ) {
              value
            }
            images(first: 25) {
              edges {
                node {
                  url
                  transformedSrc: url(
                    transform: { crop: CENTER, maxHeight: 170, maxWidth: 258 }
                  )
                }
              }
            }
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
      }
    }
  }
`

const Main = ({
  collectionData: { title, handle, descriptionHtml, image },
}) => {
  const [orderKey, setOrderKey] = useState('P_LOW_TO_HIGH'),
    [sortKey, setSortKey] = useState('PRICE'),
    [reverse, setReverse] = useState(false),
    [products, setProducts] = useState(null),
    [firstCursor, setFirstCursor] = useState(null),
    [lastCursor, setLastCursor] = useState(null),
    [pageInfo, updatePageInfo] = useState(null),
    [isLoading, setIsLoading] = useState(false),
    sortProducts = (
      {
        product: {
          variants: aVariants,
          variants: {
            edges: [firstVariantA],
          },
        },
      },
      {
        product: {
          variants: bVariants,
          variants: {
            edges: [firstVariantB],
          },
        },
      }
    ) => {
      const queenVariantA = getQueenVariant(aVariants),
        queenVariantB = getQueenVariant(bVariants),
        {
          node: {
            priceV2: { amount: amountA },
          },
        } = queenVariantA ? queenVariantA : firstVariantA,
        {
          node: {
            priceV2: { amount: amountB },
          },
        } = queenVariantB ? queenVariantB : firstVariantB
      return reverse ? amountB - amountA : amountA - amountB
    },
    scrollTop = () => {
      document.documentElement.style.scrollBehavior = 'smooth'
      document.body.scrollTop =
        document.querySelector('.product-main').offsetTop
      document.documentElement.scrollTop =
        document.querySelector('.product-main').offsetTop
      setTimeout(() => {
        document.documentElement.removeAttribute('style')
      }, 500)
    },
    { loading, refetch, fetchMore } = useQuery(GET_COLLECTION_PRODUCTS, {
      variables: {
        handle: handle,
        first: 9,
        sortKey: sortKey !== 'RELEVANCE' ? sortKey : null,
        reverse: reverse,
        filters: { price: { min: 1 } },
      },
      onCompleted: data => {
        if (data && data.collection) {
          const {
            collection: {
              result: { pageInfo, products },
            },
          } = data
          updatePageInfo(pageInfo)
          setProducts(products.sort(sortProducts))
          pageInfo.hasPreviousPage &&
            products.length &&
            setFirstCursor(products[0].cursor)
          pageInfo.hasNextPage &&
            products.length &&
            setLastCursor(products[products.length - 1].cursor)
        }
      },
    }),
    loadPrev = async () => {
      setIsLoading(true)
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          updatePageInfo(fetchMoreResult.collection.result.pageInfo)
          setProducts(
            fetchMoreResult.collection.result.products.sort(sortProducts)
          )
          fetchMoreResult.collection.result.pageInfo.hasPreviousPage &&
            fetchMoreResult.collection.result.products.length &&
            setFirstCursor(fetchMoreResult.collection.result.products[0].cursor)

          fetchMoreResult.collection.result.pageInfo.hasNextPage &&
            fetchMoreResult.collection.result.products.length &&
            setLastCursor(
              fetchMoreResult.collection.result.products[
                fetchMoreResult.collection.result.products.length - 1
              ].cursor
            )
        },
        variables: {
          before: firstCursor,
          last: 9,
          first: undefined,
        },
      })
      setIsLoading(false)
      scrollTop()
    },
    loadNext = async () => {
      setIsLoading(true)
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          updatePageInfo(fetchMoreResult.collection.result.pageInfo)
          setProducts(
            fetchMoreResult.collection.result.products.sort(sortProducts)
          )
          fetchMoreResult.collection.result.pageInfo.hasPreviousPage &&
            fetchMoreResult.collection.result.products.length &&
            setFirstCursor(fetchMoreResult.collection.result.products[0].cursor)

          fetchMoreResult.collection.result.pageInfo.hasNextPage &&
            fetchMoreResult.collection.result.products.length &&
            setLastCursor(
              fetchMoreResult.collection.result.products[
                fetchMoreResult.collection.result.products.length - 1
              ].cursor
            )
        },
        variables: {
          after: lastCursor,
          first: 9,
          last: undefined,
        },
      })
      setIsLoading(false)
      scrollTop()
    },
    changeOrder = ({ target: { value } }) => {
      setOrderKey(value)
      switch (value) {
        case 'RELEVANCE':
          setSortKey('RELEVANCE')
          setReverse(false)
          break
        case 'BEST_SELLING':
          setSortKey('BEST_SELLING')
          setReverse(false)
          break
        case 'P_LOW_TO_HIGH':
          setSortKey('PRICE')
          setReverse(false)
          break
        case 'P_HIGH_TO_LOW':
          setSortKey('PRICE')
          setReverse(true)
          break
        case 'A_Z':
          setSortKey('TITLE')
          setReverse(false)
          break
        case 'Z_A':
          setSortKey('TITLE')
          setReverse(true)
          break
        default:
      }
      refetch()
    }

  return (
    <div className={'product-main'}>
      <div className={'entry-header'}>
        <h1 className={'main-heading'}>{title}</h1>
        <div className={'filter'}>
          <div className={'d-flex align-items-center'}>
            <span className={'sort-by-label'}>Sort by</span>
            <div className={'sort-by-wrapper'}>
              <select
                className={'sort-by'}
                onChange={event => changeOrder(event)}
                onClick={() => {
                  document
                    .querySelector('.sort-by-wrapper')
                    .classList.contains('open')
                    ? document
                        .querySelector('.sort-by-wrapper')
                        .classList.remove('open')
                    : document
                        .querySelector('.sort-by-wrapper')
                        .classList.add('open')
                }}
                onBlur={() =>
                  document
                    .querySelector('.sort-by-wrapper')
                    .classList.remove('open')
                }
                value={orderKey}
              >
                <option value={'RELEVANCE'}>Relevance</option>
                <option value={'BEST_SELLING'}>Best Selling</option>
                <option value={'P_LOW_TO_HIGH'}>Price: Low to High</option>
                <option value={'P_HIGH_TO_LOW'}>Price: High to Low</option>
                <option value={'A_Z'}>Alphabetically: A to Z</option>
                <option value={'Z_A'}>Alphabetically: Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {image && (
        <div className={'img-section'}>
          <GatsbyImage
            image={image.localImage.childImageSharp.gatsbyImageData}
            alt={image.altText ? image.altText : 'collection-image'}
          />
        </div>
      )}
      <div className="description-section">
        {ReactHtmlParser(descriptionHtml)}
      </div>
      {loading ? (
        <div
          className={
            'd-flex flex-grow-1 align-items-center justify-content-center'
          }
        >
          <div
            className={'spinner-grow'}
            style={{ width: '3rem', height: '3rem' }}
            role={'status'}
          >
            <span className={'sr-only'}>Fetching...</span>
          </div>
        </div>
      ) : (
        <div className={'products'}>
          {products && products.length ? (
            <React.Fragment>
              <div className={'row'}>
                {products.map(({ product, cursor }) => {
                  return product.priceRange.minVariantPrice.amount > 0 ? (
                    <ProductBox
                      key={cursor}
                      product={product}
                      collectionTitle={title}
                    />
                  ) : null
                })}
              </div>
              <div className={'pagination'}>
                {isLoading && (
                  <div className={'spinner-grow'} role={'status'}>
                    <span className={'sr-only'}>{'Loading'}</span>
                  </div>
                )}
                {!isLoading &&
                  pageInfo &&
                  (pageInfo.hasPreviousPage || pageInfo.hasNextPage) && (
                    <React.Fragment>
                      <button
                        type={'button'}
                        className={'btn-pagination prev'}
                        onClick={() => loadPrev()}
                        disabled={!pageInfo.hasPreviousPage}
                      >
                        <ArrLeft
                          width={24}
                          height={11}
                          stroke={
                            !pageInfo.hasPreviousPage ? '#535353' : '#ffffff'
                          }
                        />
                        <span className={'label'}>PREV</span>
                      </button>
                      <button
                        type={'button'}
                        className={'btn-pagination next'}
                        onClick={() => loadNext()}
                        disabled={!pageInfo.hasNextPage}
                      >
                        <span className={'label'}>NEXT</span>
                        <ArrRight
                          width={24}
                          height={11}
                          stroke={!pageInfo.hasNextPage ? '#535353' : '#ffffff'}
                        />
                      </button>
                    </React.Fragment>
                  )}
              </div>
            </React.Fragment>
          ) : (
            <div className={'alert alert-info'} role={'alert'}>
              {'No products found'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Main
