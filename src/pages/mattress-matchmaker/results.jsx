import React, { Fragment } from 'react'

import MattressMatchmakerData from '~/components/constants/pages/mattress-matchmaker-data'
import Seo from '~/components/seo'
import Results from '~/components/MattressMatchmakerTool/results'
import Sidebar from '~/components/MattressMatchmakerTool/sidebar'

const ResultsPage = () => {
  const { seo, toolData } = MattressMatchmakerData(),
    { title, description, schema } = seo
  return (
    <Fragment>
      <Seo title={title} description={description} schemaMarkup={schema} />
      <section className={'product-category'}>
        <div className={'container-fluid'}>
          <div className={'d-flex flex-lg-row flex-column'}>
            <div className={'flex-shrink-1'}>
              <Sidebar data={toolData} />
            </div>
            <div className={'flex-grow-1'}>
              <Results data={toolData} />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default ResultsPage
