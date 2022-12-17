import React, { Fragment, useState } from 'react'
import { Link } from 'gatsby'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Accordion, Card } from 'react-bootstrap'

import GSIcon from '~/components/gs-icon'
import FormatDate from '~/components/functions/format-date'

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
      query: "-blog_title:'Home Slider' AND -blog_title:'Coupons' AND -blog_title:'Flyers' AND -blog_title:'Local Flyer' AND -blog_title:'Canada Flyer' AND -blog_title:'Extended Banners'"
    ) {
      articles: edges {
        cursor
        article: node {
          blog {
            handle
          }
          publishedAt
          handle
          title
          image {
            altText
            url(transform: { crop: CENTER, maxHeight: 111, maxWidth: 258 })
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

const SideBar = () => {
  const [articles, setArticles] = useState(null),
    { loading } = useQuery(GET_ARTICLES, {
      variables: {
        perPage: 2,
        sortKey: 'PUBLISHED_AT',
        reverse: true,
      },
      onCompleted: data => {
        if (data) {
          const {
            result: { articles },
          } = data
          setArticles(articles)
        }
      },
    })

  const [sidebar, setSidebar] = useState(false)
  const [post, setPost] = useState(false)

  const accordion = () => {
    setSidebar(!sidebar)
  }

  const secondAccordion = () => {
    setPost(!post)
  }

  return (
    <div className={'side-bar'}>
      <div className={'bread-crumb'}>
        <Link className={'home'} to={'/'}>
          Home
        </Link>
        <GSIcon icon={'gs-chevron-right'} />
        <span>Blog</span>
      </div>
      <div className={'filters-wrapper mobile-display'}>
        <div
          className={sidebar ? 'header' : 'header show'}
          onClick={() => accordion()}
          onKeyDown={() => accordion()}
          role={'button'}
          tabIndex={'0'}
        >
          <h2>Categories</h2>
        </div>
        {sidebar ? (
          <Accordion>
            <Card>
              {/* <Accordion className={'toggle-button'}>
                <Link to={'/blog/'} className={'heading'}>
                  Mattressville
                </Link>
              </Accordion> */}
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/category/announcements/'} className={'heading'}>
                  Announcements
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/category/how-to-user-guide/'} className={'heading'}>
                  How To / User Guide
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/category/tips/'} className={'heading'}>
                  Tips
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link
                  to={'/category/health-sleep-wellness/'}
                  className={'heading'}
                >
                  Health, Sleep & Wellness
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/category/promotions/'} className={'heading'}>
                  Promotions
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/category/featured-brands/'} className={'heading'}>
                  Brands
                </Link>
              </Accordion>
            </Card>
          </Accordion>
        ) : (
          ''
        )}

        {/*--------- Second Accordion ------*/}

        <div
          className={
            post ? 'header second-accordion' : 'header second-accordion show'
          }
          onClick={() => secondAccordion()}
          onKeyDown={() => secondAccordion()}
          role={'button'}
          tabIndex={'0'}
        >
          <h2>Recent Posts</h2>
        </div>
        {post ? (
          <Accordion>
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
                    {articles.map(({ article, cursor }) => {
                      return (
                        <div className={'sidebar-blog'} key={cursor}>
                          <div className={'accordion-card'}>
                            <Link to={`/blog/${article.handle}/`}>
                              <img
                                className={'blog-image'}
                                alt={article.image.altText}
                                src={article.image.url}
                                loading={'lazy'}
                                height={111}
                                width={258}
                              />
                            </Link>
                          </div>
                          <h2 className={'accordion-heading'}>
                            {article.title}
                          </h2>
                          <span className={'date'}>
                            Posted{' '}
                            {FormatDate(
                              new Date(article.publishedAt),
                              'MMM dd, yyyy'
                            )}
                          </span>
                        </div>
                      )
                    })}
                  </Fragment>
                ) : (
                  <div className={'alert alert-info'} role={'alert'}>
                    {'No Articles found'}
                  </div>
                )}
              </Fragment>
            )}
          </Accordion>
        ) : (
          ''
        )}
      </div>
      <div className={'filters-wrapper desktop-display'}>
        <div className={'header'}>
          <h2>Categories</h2>
        </div>
        <Accordion>
          {/* <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/blog/'} className={'heading'}>
                Mattressville
              </Link>
            </Accordion>
          </Card> */}
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/category/announcements/'} className={'heading'}>
                Announcements
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/category/how-to-user-guide/'} className={'heading'}>
                How To / User Guide
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/category/tips/'} className={'heading'}>
                Tips
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link
                to={'/category/health-sleep-wellness/'}
                className={'heading'}
              >
                Health, Sleep & Wellness
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/category/promotions/'} className={'heading'}>
                Promotions
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/category/featured-brands/'} className={'heading'}>
                Brands
              </Link>
            </Accordion>
          </Card>
        </Accordion>

        {/*-------- Second Accordion ------*/}

        <div className={'header second-accordion'}>
          <h2>Recent Posts</h2>
        </div>
        <Accordion>
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
                  {articles.map(({ article, cursor }) => {
                    return (
                      <div className={'sidebar-blog'} key={cursor}>
                        <div className={'accordion-card'}>
                          <Link to={`/blog/${article.handle}/`}>
                            <img
                              className={'blog-image'}
                              alt={article.image.altText}
                              src={article.image.url}
                              loading={'lazy'}
                              height={111}
                              width={258}
                            />
                          </Link>
                        </div>
                        <h2 className={'accordion-heading'}>{article.title}</h2>
                        <span className={'date'}>
                          Posted{' '}
                          {FormatDate(
                            new Date(article.publishedAt),
                            'MMM dd, yyyy'
                          )}
                        </span>
                      </div>
                    )
                  })}
                </Fragment>
              ) : (
                <div className={'alert alert-info'} role={'alert'}>
                  {'No Articles found'}
                </div>
              )}
            </Fragment>
          )}
        </Accordion>
      </div>
    </div>
  )
}

export default SideBar
