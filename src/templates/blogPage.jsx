import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import ShopifyBlogContent from '~/components/ShopifyBlogContent'

const BlogPage = ({
  data: {
    store: {
      blogData: { handle, title, seo },
    },
  },
  pageContext,
}) => {
  const { blogHandle } = pageContext

  return (
    <Fragment>
      <Seo
        title={seo.title ?? title}
        titleOnly={false}
        description={
          seo.description
            ? seo.description.slice(0, 150)
            : `Mattressville's article in the ${
                seo.title ?? title
              } will guid you to make best decisions for your sleeping needs.`
        }
        ogPath={`/category/${blogHandle}/`}
        ogImage={`/img/blog-og.jpg`}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: seo.title ?? title,
          description: seo.description
            ? seo.description.slice(0, 150)
            : `Mattressville's article in the ${
                seo.title ?? title
              } will guid you to make best decisions for your sleeping needs.`,
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <ShopifyBlogContent blogHandle={handle} blogTitle={title} seo={seo} />
    </Fragment>
  )
}

export default BlogPage

export const query = graphql`
  query ($blogHandle: String!) {
    store {
      blogData: blog(handle: $blogHandle) {
        title
        handle
        seo {
          description
          title
        }
      }
    }
  }
`
