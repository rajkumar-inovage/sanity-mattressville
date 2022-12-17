import React from 'react'

import Seo from '~/components/seo'
import Layout from '~/components/customer/Layout'
import Account from '~/components/Account'

const AccountIndexPage = () => {
  return (
    <Layout>
      <Seo
        title={'My Account'}
        description={
          'Lost your password? We can help by sending you a link to create a new password. Click here for more!'
        }
      />
      <Account />
    </Layout>
  )
}

export default AccountIndexPage
