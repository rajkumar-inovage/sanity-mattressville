import React, { Fragment, useEffect, useState } from 'react'

import Breadcrumb from './breadcrumb'
import ProductData from '~/components/constants/product-data'
import ProductContentDesktop from './product-content-desktop'
import ProductContentTablet from './product-content-tablet'
import ProductEntryDesktop from './product-entry-desktop'
import ProductEntryTablet from './product-entry-tablet'
import RelatedProducts from './related-products'

const Product = ({ product }) => {
  const { mainData } = ProductData()

  const [isTablet, setTablet] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        setTablet(window.outerWidth < 992 ? true : false)
      })
    }
  }, [setTablet])
  return (
    <section className={'product'}>
      <div className={'container-fluid position-relative'}>
        <Breadcrumb productType={product.productType} />
        {isTablet ? (
          <Fragment>
            <ProductEntryTablet product={product} />
            <ProductContentTablet product={product} data={mainData} />
          </Fragment>
        ) : (
          <Fragment>
            <ProductEntryDesktop product={product} />
            <ProductContentDesktop product={product} data={mainData} />
          </Fragment>
        )}
      </div>
      <RelatedProducts productId={product.id} />
    </section>
  )
}

export default Product
