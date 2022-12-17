import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import BlogPageData from '~/components/constants/pages/blog-page-data'
import Blog from '~/components/Blog'

const BlogPage = () => {
  const { seoData, mainData } = BlogPageData(),
    { title, description, ogImage } = seoData

  return (
    <Fragment>
      <Seo
        title={title.length > 40 ? `${title.slice(0, 40)}...` : title}
        description={description}
        titleAfter={true}
        ogPath={`/blog/`}
        ogImage={ogImage}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <Blog data={mainData} />
    </Fragment>
  )
}

export default BlogPage
