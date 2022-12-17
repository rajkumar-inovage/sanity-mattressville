import React, { Fragment, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Card from './card'
//import BlogHeader from '~/components/icons/blog-header'

const GET_ARTICLES = gql`
  query GET_ARTICLES(
    $perPage: Int
    $sortKey: ArticleSortKeys
    $reverse: Boolean
    $after: String
  ) {
    result: articles(
      first: $perPage
      sortKey: $sortKey
      reverse: $reverse
      after: $after
      query: "-blog_title:Coupons AND -blog_title:'Home Slider' AND -blog_title:'Local Flyer' AND -blog_title:'Canada Flyer' AND -blog_title:'Extended Banners'"
    ) {
      articles: edges {
        cursor
        article: node {
          authorV2 {
            firstName
            lastName
            name
          }
          blog {
            handle
          }
          publishedAt
          handle
          title
          content(truncateAt: 145)
          image {
            altText
            url(transform: { crop: CENTER, maxHeight: 150, maxWidth: 426 })
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

const Main = ({ data }) => {
  const [articles, setArticles] = useState(null),
    [lastCursor, setLastCursor] = useState(null),
    [pageInfo, updatePageInfo] = useState(null),
    [isLoadingMore, setIsLoadingMore] = useState(false),
    { loading, error, fetchMore } = useQuery(GET_ARTICLES, {
      variables: {
        perPage: 6,
        sortKey: 'PUBLISHED_AT',
        reverse: true,
      },
      onCompleted: data => {
        if (data) {
          const {
            result: { pageInfo, articles },
          } = data
          updatePageInfo(pageInfo)
          setArticles(articles)
          setLastCursor(articles[articles.length - 1].cursor)
        }
      },
    }),
    loadMore = async () => {
      setIsLoadingMore(true)
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          updatePageInfo(fetchMoreResult.result.pageInfo)
          setArticles(prevArticles =>
            prevArticles.concat(fetchMoreResult.result.articles)
          )
          setLastCursor(
            fetchMoreResult.result.articles[
              fetchMoreResult.result.articles.length - 1
            ].cursor
          )
        },
        variables: {
          after: lastCursor,
        },
      })
      setIsLoadingMore(false)
    },
    [sentryRef] = useInfiniteScroll({
      loading: isLoadingMore,
      hasNextPage: pageInfo ? pageInfo.hasNextPage : false,
      onLoadMore: loadMore,
      disabled: !!error,
      rootMargin: '0px 0px 50px 0px',
    })

  return (
    <div className={'blogs-main'}>
      <div className={'d-flex'}>
        <h1 className={'main-heading'}>Blog</h1>
      </div>
      <div className={'img-section'}>
        {/* <h2 className={'img-heading'}>Mattressville Blog</h2>
        <BlogHeader className={'blog-img'} height={202} width={239} /> */}
        <GatsbyImage
          image={data.blogBannerImage.childImageSharp.gatsbyImageData}
          alt={data.blogBannerAlt}
          className={'blog-banner-image'}
        />
      </div>
      <p className={'para'}>
        Read the lastest news about mattresses, quality sleep and all sleep
        related issues at Mattressville.ca.
      </p>
      <div className={'header-box'}>
        <Link to={'/blog/'} className={'link'}>
          All Blogs
        </Link>
        <Link className={'link'} to={'/category/announcements/'}>
          ANNOUNCEMENTS
        </Link>
        <Link className={'link'} to={'/category/how-to-user-guide/'}>
          HOW TO / USER GUIDE
        </Link>
        <Link className={'link'} to={'/category/tips/'}>
          TIPS
        </Link>
        <Link className={'link'} to={'/category/health-sleep-wellness/'}>
          Health, Sleep & Wellness
        </Link>
        <Link className={'link'} to={'/category/promotions/'}>
          PROMOTIONS
        </Link>
        <Link className={'link'} to={'/category/featured-brands/'}>
          BRANDS
        </Link>
      </div>
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
      ) : (
        <Fragment>
          {articles && articles.length ? (
            <Fragment>
              <div className={'card-grid'}>
                {articles.map(({ article, cursor }) => {
                  return <Card key={cursor} data={article} />
                })}
              </div>
              {(isLoadingMore || pageInfo) &&
                (pageInfo.hasNextPage ? (
                  <div
                    ref={sentryRef}
                    className={'d-flex justify-content-center'}
                  >
                    <div
                      className={'spinner-grow'}
                      style={{ width: '3rem', height: '3rem' }}
                      role={'status'}
                    >
                      <span className={'sr-only'}>
                        {isLoadingMore ? 'Loading' : 'Load More'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={'d-flex justify-content-center'}>
                    <p>
                      <strong>❝</strong> That's all Folks <strong>❞</strong>
                    </p>
                  </div>
                ))}
            </Fragment>
          ) : (
            <div className={'alert alert-info'} role={'alert'}>
              {'No Articles found'}
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default Main
