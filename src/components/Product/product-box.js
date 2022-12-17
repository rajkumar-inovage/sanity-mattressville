import React from 'react'

import ProductForm from './product-form'

const ProductBox = ({ product }) => {
  const getScore = productTags => {
    if (productTags.includes('Extra Firm')) {
      return 4
    } else if (productTags.includes('Firm')) {
      return 3
    } else if (productTags.includes('Medium')) {
      return 2
    } else if (productTags.includes('Soft')) {
      return 1
    } else {
      return 0
    }
  }

  return (
    <div className={'product-box'}>
      <div className={'wrap'}>
        <ProductForm product={product} />
        {product.productType === 'Mattresses' && (
          <div className={'d-flex align-items-end'}>
            <div className={'flex-shrink-1'}>
              <div className={'firm-scale'}>COMFORT SCALE</div>
            </div>
            <div className={'flex-grow-1'}>
              <div className={`firm-meter level-${getScore(product.tags)}`}>
                <h6 className={'d-flex justify-content-between'}>
                  <span className={'d-block'}>Soft</span>
                  <span className={'d-block'}>Firm</span>
                </h6>
                <div className={'d-flex'}>
                  {Array(4)
                    .fill()
                    .map((_, i) => {
                      return <div key={i} className={'meter-block flex-fill'} />
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductBox
