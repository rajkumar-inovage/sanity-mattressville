import React, { Fragment } from 'react'
import Seo from '~/components/seo'

import AllProducts from '~/components/AllProducts'

const AllProductsPage = () => {
  return (
    <Fragment>
      <Seo
        title={'All Products'}
        description={
          'Check out all our mattresses and accessories at great prices. We&#039;re showing you the best mattresses available in our store'
        }
        ogPath={'/all-products/'}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'All Products',
          description:
            'Check out all our mattresses and accessories at great prices. We&#039;re showing you the best mattresses available in our store',
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <AllProducts />
    </Fragment>
  )
}

export default AllProductsPage
