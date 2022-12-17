import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import MattressBuyingGuideData from '~/components/constants/pages/mattress-buying-guide-data'
import MattressBuyingGuide from '~/components/MattressBuyingGuide'

const MattressGuide = () => {
  const { seoData, mattressGuideData } = MattressBuyingGuideData(),
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
      <MattressBuyingGuide data={mattressGuideData} />
    </Fragment>
  )
}

export default MattressGuide
