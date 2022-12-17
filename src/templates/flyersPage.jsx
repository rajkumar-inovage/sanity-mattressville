import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Seo from '~/components/seo'
import Flyers from '~/components/MattressSaleFlyers/flyers'

const FlyersPage = ({
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
  const { ogPath } = pageContext
  const description =
    seoDescription !== ''
      ? seoDescription
      : excerpt && excerpt !== ''
      ? excerpt
      : content

  return (
    <Fragment>
      <Seo
        title={seoTitle}
        description={description}
        ogPath={ogPath}
        ogImage={ogImage}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: seoTitle,
          description,
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <Flyers
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

export default FlyersPage

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
                    thumb: gatsbyImageData(placeholder: BLURRED)
                    full: gatsbyImageData(layout: FULL_WIDTH)
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
