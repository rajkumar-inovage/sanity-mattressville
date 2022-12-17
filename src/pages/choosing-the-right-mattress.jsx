import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import ChoosingRightMattressData from '~/components/constants/pages/choosing-right-mattress-data'
import RightMattress from '~/components/ChoosingRightMattress'

const ChoosingRightMattress = () => {
  const { seoData, rightmattress } = ChoosingRightMattressData(),
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
      <RightMattress data={rightmattress} />
    </Fragment>
  )
}

export default ChoosingRightMattress
