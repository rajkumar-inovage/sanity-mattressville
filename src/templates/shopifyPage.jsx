import React, { Fragment, useEffect } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import ShopifyPageContent from '~/components/ShopifyPageContent'

const ShopifyPage = ({
  data: {
    store: {
      pageData: { body, bodySummary, title },
    },
  },
  pageContext,
}) => {
  const { ogPath } = pageContext

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const oldUrls = [
        'remove-worst-stains-mattress',
        'invest-memory-foam-mattress',
        'importance-good-sleep-life',
        'nine-reasons-time-consider-getting-new-mattress',
      ]
      const redirectUrls = [
        'blog/how-to-clean-a-mattress-a-complete-guide',
        'blog/the-best-mattress-for-side-sleepers-8-benefits-of-quality-memory-foam-mattresses',
        'blog/how-much-sleep-do-we-really-need-your-essential-sleep-guide',
        'blog/7-signs-you-need-a-mattress-replacement',
      ]
      oldUrls.forEach((url, index) => {
        if (window.location.href.indexOf(url) !== -1)
          window.location.href = window.location.href.replace(
            url,
            redirectUrls[index]
          )
      })
    }
  }, [])

  return (
    <Fragment>
      <Seo
        title={title}
        description={bodySummary !== '' ? bodySummary : undefined}
        ogPath={ogPath}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description: bodySummary !== '' ? bodySummary : undefined,
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <ShopifyPageContent title={title} body={body} />
    </Fragment>
  )
}

export default ShopifyPage

export const query = graphql`
  query ($handle: String!) {
    store {
      pageData: page(handle: $handle) {
        body
        bodySummary
        createdAt
        handle
        id
        title
        updatedAt
      }
    }
  }
`
