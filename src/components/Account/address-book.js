import React from 'react'

import Sidebar from './side-bar'
import AddressBookMain from './address-book-main'

const AddressBook = () => {
  return (
    <section className={'my-account'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar />
          </div>
          <div className={'flex-grow-1'}>
            <AddressBookMain />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddressBook
