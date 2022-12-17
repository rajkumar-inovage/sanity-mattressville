import React from 'react'

import Sidebar from './sidebar'
import Main from './main'
import BlogPageData from '~/components/constants/pages/blog-page-data'

const ShopifyBlogContent = ({ blogHandle, blogTitle, seo }) => {
  const { mainData } = BlogPageData()
  return (
    <section className={'blog'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar blogTitle={blogTitle} />
          </div>
          <div className={'flex-grow-1'}>
            <Main blogHandle={blogHandle} blogTitle={blogTitle} seo={seo} bannerData={mainData} />
          </div>
        </div>
      </div>
    </section>
  )
}
export default ShopifyBlogContent
