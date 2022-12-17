import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import CouponsDealsData from '~/components/constants/pages/coupons-deals-data'
import CouponsDeals from '~/components/CouponsDeals'

const CouponsDealsPage = () => {
  const { seoData, mainData } = CouponsDealsData(),
    { title, description, ogPath } = seoData

  return (
    <Fragment>
      <Seo
        title={title}
        description={description}
        ogPath={ogPath}
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
      <CouponsDeals data={mainData} />
    </Fragment>
  )
}

export default CouponsDealsPage
