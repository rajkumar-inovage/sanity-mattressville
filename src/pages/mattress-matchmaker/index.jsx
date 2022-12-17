import React, { Fragment } from 'react'

import MattressMatchmakerData from '~/components/constants/pages/mattress-matchmaker-data'
import Seo from '~/components/seo'
import MattressMatchmakerTool from '~/components/MattressMatchmakerTool'

const MattressMatchmaker = () => {
  const { seo, toolData } = MattressMatchmakerData(),
    { title, description, ogPath } = seo

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
      <MattressMatchmakerTool data={toolData} />
    </Fragment>
  )
}

export default MattressMatchmaker
