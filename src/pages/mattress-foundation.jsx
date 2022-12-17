import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import MattressFoundationData from '~/components/constants/pages/mattress-foundation-data'
import MattressFoundation from '~/components/MattressFoundation'

const MattressGuide = () => {
  const { seoData, mattressGuideData } = MattressFoundationData(),
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
      <MattressFoundation data={mattressGuideData} />
    </Fragment>
  )
}

export default MattressGuide
