import React from 'react'

import Seo from '~/components/seo'
import Layout from '~/components/customer/Layout'
import PaymentMethod from '~/components/Account/payment-method'

const PaymentMethodsPage = () => {
  return (
    <Layout>
      <Seo title={'Payment Methods'} description={''} />
      <PaymentMethod />
    </Layout>
  )
}

export default PaymentMethodsPage
