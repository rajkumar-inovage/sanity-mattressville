import React from 'react'

import Sidebar from './side-bar'
import ProductReviewMain from './product-review-main'

const ProductReview = () => {
  return (
    <section className={'my-account'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar />
          </div>
          <div className={'flex-grow-1'}>
            <ProductReviewMain />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReview
