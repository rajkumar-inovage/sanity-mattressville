import React from 'react'
import ReactHtmlParser from 'html-react-parser'

import Gallery from './gallery'
import ProductBox from './product-box'

const ProductEntryDesktop = ({ product }) => {
  const {
      images,
      variants: {
        edges: [initialVariant],
      },
      collections: { edges: categories },
    } = product,
    variant = { ...initialVariant.node }
  return (
    <div className={'product-entry'}>
      <div className={'flex-shrink-1'}>
        <div className={'d-flex h-100 flex-column'}>
          <Gallery images={images.edges} />
          <div className={'product-sku'}>
            <strong>{'SKU: '}</strong>
            <span>{variant.sku !== '' ? variant.sku : 'N/A'}</span>
          </div>
        </div>
      </div>
      <div className={'flex-grow-1'}>
        <div className={'d-flex h-100 flex-column'}>
          <ProductBox product={product} />
          <div className={'product-categories'}>
            <strong>{'Categories: '}</strong>
            {categories.map(({ node: { handle, title } }) => (
              <React.Fragment key={handle}>
                <strong>{title && `${ReactHtmlParser(title)}, `}</strong>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductEntryDesktop
