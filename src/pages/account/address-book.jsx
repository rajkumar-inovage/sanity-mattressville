import React from 'react'

import Seo from '~/components/seo'
import Layout from '~/components/customer/Layout'
import AddressBook from '~/components/Account/address-book'

const AddressBookPage = () => {
  return (
    <Layout>
      <Seo title={'Address Book'} description={''} />
      <AddressBook />
    </Layout>
  )
}

export default AddressBookPage
