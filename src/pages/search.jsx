import React, { Fragment } from 'react'
import Seo from '~/components/seo'

import Sidebar from '~/components/Search/sidebar'
import Results from '~/components/Search/results'

const SearchPage = () => {
  return (
    <Fragment>
      <Seo
        title={'Search Results'}
        ogPath={'/search'}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Search Results',
          description:
            'Search Results of the products queried in the search box.',
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

export default SearchPage
