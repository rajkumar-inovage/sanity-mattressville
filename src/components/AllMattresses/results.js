import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { GatsbyImage } from 'gatsby-plugin-image'

import GSIcon from '~/components/gs-icon'
import parseBool from '~/components/functions/parse-bool'
import ArrLeft from '~/components/icons/arr-left'
import ArrRight from '~/components/icons/arr-right'
import getQueenVariant from '~/components/functions/get-queen-variant'
import ProductBox from './product-box'
import ArchiveCollectionData from '~/components/constants/pages/archive-collection-data'

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

const Results = () => {
  const { entrydata } = ArchiveCollectionData()
  const [Tags, setTags] = useState([]),
    [Styles, setStyles] = useState([]),
    [Sizes, setSizes] = useState([]),
    [Prices, setPrices] = useState([]),
    [Firmness, setFirmness] = useState([]),
    [Height, setHeight] = useState(''),
    [Clearance, setClearance] = useState(false),
    [Vendors, setVendors] = useState([]),
    [
      priceMin,
      //setPriceMin
    ] = useState(1),
    [
      priceMax,
      //setPriceMax
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
        query: `product_type:Mattresses${
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
          Prices.length
            ? ` AND (${Prices.map(
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
        }${Clearance ? ` AND (tag:'Clearance')` : ''}${
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
      scrollTop()
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
    }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search),
        url = new URL(window.location)
      params.get('tags') &&
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
          const newParams = new URLSearchParams(window.location.search),
            allVendors = decodeURIComponent(newParams.get('vendor')).split(',')
          if (target.checked) {
            setVendors(oldArray => {
              const newArray = [...oldArray, target.value]
              !allVendors.includes(target.value) &&
                url.searchParams.set('vendor', newArray.join(','))
              return newArray
            })
          } else {
            setVendors(oldArray => {
              const newArray = oldArray.filter(value => {
                return value !== target.value
              })
              if (allVendors.includes(target.value)) {
                url.searchParams.set('vendor', newArray.join(','))
              }
              if (newArray.length === 0) {
                url.searchParams.delete('vendor')
              }
              return newArray
            })
          }
          window.history.replaceState({}, '', url)
        })
      })
      if (params.get('vendor')) {
        const allVendors = decodeURIComponent(params.get('vendor')).split(',')
        allVendors.forEach(vendor => {
          document
            .querySelector(
              `.vendor[value="${decodeURIComponent(
                vendor.includes('-') ? vendor.split('-').join('=') : vendor
              )}"]`
            )
            .click()
        })
        allVendors.length > 0 &&
          document.querySelector(`.toggle-vendor`).click()
      }
      // Vendors Filter END
      // Apply Styles/Types Filter
      document.querySelectorAll('.tag-style').forEach(element => {
        element.addEventListener('change', ({ target }) => {
          const newParams = new URLSearchParams(window.location.search),
            allStyles = decodeURIComponent(newParams.get('tag-style')).split(
              ','
            )
          if (target.checked) {
            setStyles(oldArray => {
              const newArray = oldArray.includes(target.value)
                ? oldArray
                : [...oldArray, target.value]
              !allStyles.includes(target.value) &&
                url.searchParams.set('tag-style', newArray.join(','))
              return newArray
            })
          } else {
            setStyles(oldArray => {
              const newArray = oldArray.filter(value => {
                return value !== target.value
              })
              if (allStyles.includes(target.value)) {
                url.searchParams.set('tag-style', newArray.join(','))
              }
              if (newArray.length === 0) {
                url.searchParams.delete('tag-style')
              }
              return newArray
            })
          }
          window.history.replaceState({}, '', url)
        })
      })
      if (params.get('tag-style')) {
        const allStyles = decodeURIComponent(params.get('tag-style')).split(',')
        allStyles.forEach(style => {
          document
            .querySelector(`.tag-style[value="${decodeURIComponent(style)}"]`)
            .click()
        })
        allStyles.length > 0 &&
          document.querySelector(`.toggle-tag-style`).click()
      }

           // Apply Prices filter
           document.querySelectorAll('.price').forEach(element => {
            element.addEventListener('change', ({ target }) => {
              const newParams = new URLSearchParams(window.location.search),
                allPrices = decodeURIComponent(newParams.get('price')).split(',')
              if (target.checked) {
                setPrices(oldArray => {
                  const newArray = oldArray.includes(target.value)
                    ? oldArray
                    : [...oldArray, target.value]
                  !allPrices.includes(target.value) &&
                    url.searchParams.set('price', newArray.join(','))
                  return newArray
                })
              } else {
                setPrices(oldArray => {
                  const newArray = oldArray.filter(value => {
                    return value !== target.value
                  })
                  if (allPrices.includes(target.value)) {
                    url.searchParams.set('price', newArray.join(','))
                  }
                  if (newArray.length === 0) {
                    url.searchParams.delete('price')
                  }
                  return newArray
                })
              }
              window.history.replaceState({}, '', url)
            })
          })
          if (params.get('price')) {
            const allPrices = decodeURIComponent(params.get('price')).split(',')
            allPrices.forEach(price => {
              document
                .querySelector(`.price[value="${decodeURIComponent(price)}"]`)
                .click()
            })
            allPrices.length > 0 &&
              document.querySelector(`.toggle-price`).click()
          }

      // Apply Sizes filter
      document.querySelectorAll('.tag-size').forEach(element => {
        element.addEventListener('change', ({ target }) => {
          const newParams = new URLSearchParams(window.location.search),
            allSizes = decodeURIComponent(newParams.get('tag-size')).split(',')
          if (target.checked) {
            setSizes(oldArray => {
              const newArray = oldArray.includes(target.value)
                ? oldArray
                : [...oldArray, target.value]
              !allSizes.includes(target.value) &&
                url.searchParams.set('tag-size', newArray.join(','))
              return newArray
            })
          } else {
            setSizes(oldArray => {
              const newArray = oldArray.filter(value => {
                return value !== target.value
              })
              if (allSizes.includes(target.value)) {
                url.searchParams.set('tag-size', newArray.join(','))
              }
              if (newArray.length === 0) {
                url.searchParams.delete('tag-size')
              }
              return newArray
            })
          }
          window.history.replaceState({}, '', url)
        })
      })
      if (params.get('tag-size')) {
        const allSizes = decodeURIComponent(params.get('tag-size')).split(',')
        allSizes.forEach(size => {
          document
            .querySelector(`.tag-size[value="${decodeURIComponent(size)}"]`)
            .click()
        })
        allSizes.length > 0 &&
          document.querySelector(`.toggle-tag-size`).click()
      }

      // Apply Firmness Filter
      document.querySelectorAll('.tag-firmness').forEach(element => {
        element.addEventListener('change', ({ target }) => {
          const newParams = new URLSearchParams(window.location.search),
            allFirmness = decodeURIComponent(
              newParams.get('tag-firmness')
            ).split(',')
          if (target.checked) {
            setFirmness(oldArray => {
              const newArray = oldArray.includes(target.value)
                ? oldArray
                : [...oldArray, target.value]
              !allFirmness.includes(target.value) &&
                url.searchParams.set('tag-firmness', newArray.join(','))
              return newArray
            })
          } else {
            setFirmness(oldArray => {
              const newArray = oldArray.filter(value => {
                return value !== target.value
              })
              if (allFirmness.includes(target.value)) {
                url.searchParams.set('tag-firmness', newArray.join(','))
              }
              if (newArray.length === 0) {
                url.searchParams.delete('tag-firmness')
              }
              return newArray
            })
          }
          window.history.replaceState({}, '', url)
        })
      })
      if (params.get('tag-firmness')) {
        const allFirmness = decodeURIComponent(
          params.get('tag-firmness')
        ).split(',')
        allFirmness.forEach(firmness => {
          document
            .querySelector(
              `.tag-firmness[value="${decodeURIComponent(firmness)}"]`
            )
            .click()
        })
        allFirmness.length > 0 &&
          document.querySelector(`.toggle-tag-firmness`).click()
      }

      // Apply Height Filter //
      const event = new Event('change')
      document
        .querySelector('#tag-mat_height')
        .addEventListener('change', ({ target: { value } }) => {
          url.searchParams.set('tag-mat_height', value)
          setHeight(value)
          if (value === '') {
            url.searchParams.delete('tag-mat_height')
          }
          window.history.replaceState({}, '', url)
        })
      if (params.get('tag-mat_height')) {
        const selectBox = document.querySelector(`.tag-mat_height`)
        selectBox.value = decodeURIComponent(params.get('tag-mat_height'))
        selectBox.dispatchEvent(event)
        document.querySelector(`.toggle-tag-mat_height`).click()
      }

      // Apply Clearance Filter
      document
        .querySelector('#tag-clearance')
        .addEventListener('change', ({ target: { checked } }) => {
          const newParams = new URLSearchParams(window.location.search),
            isClearance = newParams.get('clearance')
          if (checked) {
            isClearance === null && url.searchParams.set('clearance', 1)
            setClearance(true)
          } else {
            isClearance !== null && url.searchParams.delete('clearance')
            setClearance(false)
          }
          window.history.replaceState({}, '', url)
        })
      if (parseBool(params.get('clearance'))) {
        document.querySelector('#tag-clearance').click()
      }

      // Apply Price Filter
    }
  }, [Tags, setTags])

  return (
    <div className={'product-main'}>
      <div className={'entry-header'}>
        <h1 className={'main-heading'}>
          <span>{'All Mattresses'}</span>
        </h1>
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
      <div className={'entry-tags'}>
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
        {Prices.map((tag, index) => {
          return (
            <div className={'tag-wrap'} key={index}>
              <span className={'tag'}>{tag.split('=').join('-')}</span>
            </div>
          )
        })}
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
        {Clearance && (
          <div className={'tag-wrap'}>
            <span className={'tag'}>{'Clearance'}</span>
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
      <div className={'img-section'}>
        <GatsbyImage
          image={entrydata.allmattressimage.childImageSharp.gatsbyImageData}
          alt={entrydata.allmattressimageAlt}
        />
      </div>
      <div className={'description-section'}>{entrydata.allmattressdescription}</div>
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

export default Results
