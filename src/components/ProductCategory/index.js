import React from 'react'

import Sidebar from './sidebar'
import Main from './Main'

const ProductCategory = ({ collectionData }) => {
  return (
    <section className={'product-category'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar collectionData={collectionData} />
          </div>
          <div className={'flex-grow-1'}>
            <Main collectionData={collectionData} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCategory
