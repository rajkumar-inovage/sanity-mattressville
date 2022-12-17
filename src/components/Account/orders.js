import React from 'react'
import OrdersMain from './orders-main'

import Sidebar from './side-bar'

const Orders = () => {
  return (
    <section className={'my-account'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar />
          </div>
          <div className={'flex-grow-1'}>
            <OrdersMain />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Orders
