import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import Cart from '~/components/Cart'

const CartPage = () => {
  return (
    <Fragment>
      <Seo
        title={'Cart'}
        description={
          'MattressVille is a top-quality bedding products retailer aiming to provide you with a premium sleeping experience. Browse now & Fill your cart today!'
        }
        ogPath={`/cart/`}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Cart',
          description:
            'MattressVille is a top-quality bedding products retailer aiming to provide you with a premium sleeping experience. Browse now & Fill your cart today!',
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <Cart />
    </Fragment>
  )
}

export default CartPage
