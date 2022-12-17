import React from 'react'

import Sidebar from './sidebar'
import Main from './main'

const ContactUs = ({ data }) => {
  return (
    <section className={'non-category'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar />
          </div>
          <div className={'flex-grow-1'}>
            <Main data={data} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
