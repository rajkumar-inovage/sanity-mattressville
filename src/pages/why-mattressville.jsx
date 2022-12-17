import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import WhyMattressvilleData from '~/components/constants/pages/why-mattressville-data'
import NonCategory from '~/components/NonCategory'

const WhyUs = () => {
  const { seoData, mainData } = WhyMattressvilleData(),
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
      <NonCategory data={mainData} />
    </Fragment>
  )
}

export default WhyUs
