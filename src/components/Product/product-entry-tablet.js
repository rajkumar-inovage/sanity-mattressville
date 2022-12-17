import React from 'react'

import ProductFormTablet from './product-form-tablet'

const ProductEntryTablet = ({ product }) => {
  return (
    <div className={'product-entry d-block'}>
      <div className={'mobile-module'}>
        <div className={'product-entry-inner'}>
          <div className={'d-flex h-100 flex-column'}>
            <ProductFormTablet product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductEntryTablet
