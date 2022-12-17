import React, { Fragment } from 'react'
import Seo from '~/components/seo'

import Sidebar from '~/components/AllMattresses/sidebar'
import Results from '~/components/AllMattresses/results'

const AllMattressesPage = () => {
  return (
    <Fragment>
      <Seo
        title={'All Mattresses'}
        description={
          'Mattressville provides the best all-around mattress at great discounts. Buy online from our wide selection of mattresses for sale & enjoy free delivery. Call us!'
        }
        ogPath={'/all-mattresses/'}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'All Mattresses',
          description:
            'Mattressville provides the best all-around mattress at great discounts. Buy online from our wide selection of mattresses for sale & enjoy free delivery. Call us!',
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <section className={'product-category'}>
        <div className={'container-fluid'}>
          <div className={'d-flex flex-lg-row flex-column'}>
            <div className={'flex-shrink-1'}>
              <Sidebar />
            </div>
            <div className={'flex-grow-1'}>
              <Results />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default AllMattressesPage
