import React from 'react'

import Sidebar from './side-bar'
import PaymentMethodMain from './payment-method-main'

const PaymentMethod = () => {
  return (
    <section className={'my-account'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar />
          </div>
          <div className={'flex-grow-1'}>
            <PaymentMethodMain />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentMethod
