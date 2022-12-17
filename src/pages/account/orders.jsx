import React from 'react'

import Seo from '~/components/seo'
import Layout from '~/components/customer/Layout'
import Orders from '~/components/Account/orders'

const OrdersPage = () => {
  return (
    <Layout>
      <Seo title={'My Orders'} description={''} />
      <Orders />
    </Layout>
  )
}

export default OrdersPage
