import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import FlyersData from '~/components/constants/pages/mattress-sale-flyers-data'
import MattressSaleFlyers from '~/components/MattressSaleFlyers'

const FlyersPage = () => {
  const { seoData, mainData } = FlyersData(),
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
      <MattressSaleFlyers data={mainData} />
    </Fragment>
  )
}

export default FlyersPage
