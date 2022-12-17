import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import ContactUsData from '~/components/constants/pages/contact-us-data'
import ContactUs from '~/components/ContactUs'

const CouponsDealsPage = () => {
  const { seoData, mainData } = ContactUsData(),
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
      <ContactUs data={mainData} />
    </Fragment>
  )
}

export default CouponsDealsPage
