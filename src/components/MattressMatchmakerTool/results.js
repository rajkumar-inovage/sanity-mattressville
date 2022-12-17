import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import GSIcon from '~/components/gs-icon'
import ArrLeft from '~/components/icons/arr-left'
import ArrRight from '~/components/icons/arr-right'
import getQueenVariant from '~/components/functions/get-queen-variant'
import ProductBox from './product-box'

const GET_PRODUCTS = gql`
  query GET_PRODUCTS(
    $query: String
    $last: Int
    $first: Int
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $before: String
    $after: String
  ) {
    result: products(
      query: $query
      first: $first
      last: $last
      sortKey: $sortKey
      before: $before
      after: $after
      reverse: $reverse
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
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

const ResultsPage = () => {
  const pageTitle = 'Best mattresses for you',
    [shareUrl, setShareUrl] = useState(''),
    [Tags, setTags] = useState([]),
    [Styles, setStyles] = useState([]),
    [Sizes, setSizes] = useState([]),
    [Firmness, setFirmness] = useState([]),
    [Height, setHeight] = useState(''),
    [Vendors, setVendors] = useState([]),
    [priceMin,
      // setPriceMin
    ] = useState(1),
    [priceMax,
      // setPriceMax
    ] = useState(3699),
    [orderKey, setOrderKey] = useState('P_LOW_TO_HIGH'),
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
    { loading, refetch, fetchMore } = useQuery(GET_PRODUCTS, {
      variables: {
        query: `${
          Tags.length
            ? Tags.map(tag => ` tag:'${decodeURIComponent(tag)}' `).join('AND')
            : ''
        }${
          Styles.length
            ? ` AND (${Styles.map(
                tag => ` tag:'${decodeURIComponent(tag)}' `
              ).join('OR')})`
            : ''
        }${
          Sizes.length
            ? ` AND (${Sizes.map(
                tag => ` tag:'${decodeURIComponent(tag)}' `
              ).join('OR')})`
            : ''
        }${
          Firmness.length
            ? ` AND (${Firmness.map(
                tag => ` tag:'${decodeURIComponent(tag)}' `
              ).join('OR')})`
            : ''
        }${Height !== '' ? ` AND (tag:'${decodeURIComponent(Height)}')` : ''}${
          Vendors.length
            ? ` AND (${Vendors.map(vendor => ` vendor:'${vendor}' `).join(
                'OR'
              )})`
            : ''
        }${
          priceMin > 1 || priceMax < 3699
            ? ` AND (variants.price:>=${priceMin} AND variants.price:<=${priceMax})`
            : ` AND (variants.price:>${priceMin})`
        }`,
        first: 9,
        sortKey: sortKey !== 'RELEVANCE' ? sortKey : null,
        reverse: reverse,
      },
      onCompleted: data => {
        if (data) {
          const {
            result: { pageInfo, products },
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
          updatePageInfo(fetchMoreResult.result.pageInfo)
          setProducts(fetchMoreResult.result.products.sort(sortProducts))
          fetchMoreResult.result.pageInfo.hasPreviousPage &&
            fetchMoreResult.result.products.length &&
            setFirstCursor(fetchMoreResult.result.products[0].cursor)
          fetchMoreResult.result.pageInfo.hasNextPage &&
            fetchMoreResult.result.products.length &&
            setLastCursor(
              fetchMoreResult.result.products[
                fetchMoreResult.result.products.length - 1
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
    },
    loadNext = async () => {
      setIsLoading(true)
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          updatePageInfo(fetchMoreResult.result.pageInfo)
          setProducts(fetchMoreResult.result.products.sort(sortProducts))
          fetchMoreResult.result.pageInfo.hasPreviousPage &&
            fetchMoreResult.result.products.length &&
            setFirstCursor(fetchMoreResult.result.products[0].cursor)
          fetchMoreResult.result.pageInfo.hasNextPage &&
            fetchMoreResult.result.products.length &&
            setLastCursor(
              fetchMoreResult.result.products[
                fetchMoreResult.result.products.length - 1
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
    setOrder = caseValue => {
      setOrderKey(caseValue)
      switch (caseValue) {
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
    },
    changeOrder = ({ target: { value } }) => {
      setOrder(value)
      refetch()
    },
    dismissTag = dismissThisTag => {
      setTags(
        Tags.filter(TAG => {
          return dismissThisTag !== TAG
        })
      )
    }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setShareUrl(window.location.href)
      params
        .get('tags')
        .split(',')
        .forEach(tag => {
          Tags.length === 0 &&
            setTags(oldTags => [...oldTags, decodeURIComponent(tag)])
        })
      params.get('order') && setOrder(params.get('order'))
      // Apply Vendors Filter
      document.querySelectorAll('.vendor').forEach(element => {
        element.addEventListener('change', ({ target }) => {
          if (target.checked) {
            setVendors(oldArray => [...oldArray, target.value])
          } else {
            setVendors(oldArray => {
              return oldArray.filter((value, index) => {
                return value !== target.value
              })
            })
          }
        })
      })
      // Apply Styles/Types Filter
      document.querySelectorAll('.tag-style').forEach(element => {
        element.addEventListener('change', ({ target }) => {
          if (target.checked) {
            setStyles(oldArray =>
              oldArray.includes(target.value)
                ? oldArray
                : [...oldArray, target.value]
            )
          } else {
            setStyles(oldArray => {
              return oldArray.filter((value, index) => {
                return value !== target.value
              })
            })
          }
        })
      })
      // Apply Sizes Filter
      document.querySelectorAll('.tag-size').forEach(element => {
        element.addEventListener('change', ({ target }) => {
          if (target.checked) {
            setSizes(oldArray =>
              oldArray.includes(target.value)
                ? oldArray
                : [...oldArray, target.value]
            )
          } else {
            setSizes(oldArray => {
              return oldArray.filter((value, index) => {
                return value !== target.value
              })
            })
          }
        })
      })
      // Apply Firmness Filter
      document.querySelectorAll('.tag-firmness').forEach(element => {
        element.addEventListener('change', ({ target }) => {
          if (target.checked) {
            setFirmness(oldArray =>
              oldArray.includes(target.value)
                ? oldArray
                : [...oldArray, target.value]
            )
          } else {
            setFirmness(oldArray => {
              return oldArray.filter((value, index) => {
                return value !== target.value
              })
            })
          }
        })
      })
      // Apply Height Filter
      document
        .querySelector('#tag-mat_height')
        .addEventListener('change', ({ target: { value } }) => {
          setHeight(value)
        })
    }
  }, [Tags, setTags])

  return (
    <div className={'product-main'}>
      <div className={'entry-header'}>
        <h1 className={'main-heading'}>{pageTitle}</h1>
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
      <div className={'share-result mb-4'}>
        <div className={'input-group'}>
          <div className={'input-group-prepend'}>
            <button
              type={'button'}
              className={'btn-share'}
              onClick={() => {
                document.querySelector('#share-url').select()
                document.execCommand('copy')
                alert(
                  'Link has been copied, please share link with your family or friends. You can paste link in your email'
                )
              }}
            >
              <span className={'mr-2'}>Share</span>
              <GSIcon icon={'gs-share-2'} />
            </button>
          </div>
          <input
            type={'text'}
            id={'share-url'}
            className={'form-control'}
            readOnly={true}
            defaultValue={shareUrl}
          />
          <div className={'input-group-append'}>
            <a
              href={`mailto:?subject=${decodeURIComponent(
                pageTitle
              )}&body=${decodeURIComponent(
                `Check this out: `
              )}${encodeURIComponent(shareUrl)}`}
              className={'btn-mail'}
            >
              <span className={'mr-2'}>Send eMail</span>
              <GSIcon icon={'gs-mail'} />
            </a>
          </div>
        </div>
      </div>
      <div className={'entry-tags'}>
        {Tags.map((tag, index) => {
          return (
            <div className={'tag-wrap'} key={index}>
              <span className={'tag'}>{tag}</span>
              <button
                aria-label={'Dismiss Tag'}
                className={'dismiss'}
                onClick={() => dismissTag(tag)}
              >
                <GSIcon icon={'gs-x'} />
              </button>
            </div>
          )
        })}
        {(priceMin > 1 || priceMax < 3699) && (
          <div className={'tag-wrap'}>
            <span className={'tag'}>{`Price Min: ${priceMin}`}</span>
          </div>
        )}
        {(priceMin > 1 || priceMax < 3699) && (
          <div className={'tag-wrap'}>
            <span className={'tag'}>{`Price Max: ${priceMax}`}</span>
          </div>
        )}
        {Styles.map((tag, index) => {
          return (
            <div className={'tag-wrap'} key={index}>
              <span className={'tag'}>{tag}</span>
            </div>
          )
        })}
        {Sizes.map((tag, index) => {
          return (
            <div className={'tag-wrap'} key={index}>
              <span className={'tag'}>{tag}</span>
            </div>
          )
        })}
        {Firmness.map((tag, index) => {
          return (
            <div className={'tag-wrap'} key={index}>
              <span className={'tag'}>{tag}</span>
            </div>
          )
        })}
        {Height !== '' && (
          <div className={'tag-wrap'}>
            <span className={'tag'}>{Height}</span>
            <button
              aria-label={'Dismiss Height'}
              className={'dismiss'}
              onClick={() => setHeight('')}
            >
              <GSIcon icon={'gs-x'} />
            </button>
          </div>
        )}
        {Vendors.map((vendor, index) => {
          return (
            <div className={'tag-wrap'} key={index}>
              <span className={'tag'}>
                {vendor.includes('=') ? vendor.split('=').join('-') : vendor}
              </span>
            </div>
          )
        })}
      </div>
      <div className={'products'}>
        {loading ? (
          <div className={'d-flex justify-content-center'}>
            <div
              className={'spinner-grow'}
              style={{ width: '3rem', height: '3rem' }}
              role={'status'}
            >
              <span className={'sr-only'}>Fetching...</span>
            </div>
          </div>
        ) : products && products.length ? (
          <React.Fragment>
            <div className={'row'}>
              {products.map(({ product, cursor }) => {
                return product.priceRange.minVariantPrice.amount > 0 ? (
                  <ProductBox key={cursor} product={product} />
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
    </div>
  )
}

export default ResultsPage
