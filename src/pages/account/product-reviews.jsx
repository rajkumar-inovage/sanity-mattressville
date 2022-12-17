import React from 'react'

import Seo from '~/components/seo'
import Layout from '~/components/customer/Layout'
import ProductReview from '~/components/Account/product-review'

const ProductReviewsPage = () => {
  return (
    <Layout>
      <Seo title={'Product Reviews'} description={''} />
      <ProductReview />
    </Layout>
  )
}

export default ProductReviewsPage
