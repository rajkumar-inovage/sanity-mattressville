import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import FormatDate from '~/components/functions/format-date'
import ShopifyArticleContent from '~/components/ShopifyArticleContent'

const ArticlePage = ({
  data: {
    store: {
      blogData: {
        edges: [
          {
            node: {
              title: blogTitle,
              articleData: {
                authorV2: { name: authorName },
                title,
                contentHtml,
                content,
                excerpt,
                image,
                image: {
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
                publishedAt,
                seo: { title: seoTitle, description: seoDescription },
              },
            },
          },
        ],
      },
    },
  },
  pageContext,
}) => {
  const { articleHandle } = pageContext
  const description =
    seoDescription !== ''
      ? seoDescription.slice(0, 145)
      : excerpt && excerpt !== ''
      ? excerpt
      : content

  return (
    <Fragment>
      <Seo
        title={seoTitle.length > 40 ? `${seoTitle.slice(0, 40)}...` : seoTitle}
        description={description}
        ogPath={`/blog/${articleHandle}/`}
        ogImage={ogImage}
        titleOnly={true}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: seoTitle,
          image: ogImage,
          editor: 'Mattressville Shop',
          publisher: 'Mattressville',
          url: `/blog/${articleHandle}/`,
          datePublished: FormatDate(new Date(publishedAt), 'yyyy-MM-dd'),
          description,
          author: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <ShopifyArticleContent
        blogTitle={blogTitle}
        title={title}
        contentHtml={contentHtml}
        content={content}
        image={image}
        authorName={authorName}
        articleDate={new Date(publishedAt)}
      />
    </Fragment>
  )
}

export default ArticlePage

export const query = graphql`
  query ($blogHandle: String!, $articleHandle: String!) {
    store {
      blogData: blogs(query: $blogHandle, first: 1) {
        edges {
          node {
            title
            articleData: articleByHandle(handle: $articleHandle) {
              authorV2 {
                name
              }
              publishedAt
              title
              contentHtml
              content(truncateAt: 145)
              excerpt(truncateAt: 145)
              seo {
                title
                description
              }
              image {
                url
                localImage {
                  childImageSharp {
                    gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
