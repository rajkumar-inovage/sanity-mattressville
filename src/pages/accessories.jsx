import React, { Fragment } from 'react'
import Seo from '~/components/seo'

import Sidebar from '~/components/Accessories/sidebar'
import Results from '~/components/Accessories/results'

const AccessoriesPage = () => {
  return (
    <Fragment>
      <Seo
        title={'Accessories'}
        description={
          'Mattressville will help improve your sleep. Find a variety of bed accessories from metal frames to mattress protectors in our online store. Shop now!'
        }
        ogPath={'/accessories/'}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Accessories',
          description:
            'Mattressville will help improve your sleep. Find a variety of bed accessories from metal frames to mattress protectors in our online store. Shop now!',
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

export default AccessoriesPage
