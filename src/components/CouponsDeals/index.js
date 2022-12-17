import React from 'react'

import Sidebar from './sidebar'
import Main from './main'

const CouponsDeals = ({ data }) => {
  return (
    <section className={'coupons-deals'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar />
          </div>
          <Main data={data} />
        </div>
      </div>
      <div className={'terms'}>
        <div className={'container-fluid'}>
          <div className={'content'}>
            <p>
              <strong>
                *These coupons can be redeemed through this website or at our
                store (1911 Dundas St. East, Unit 18 – Mississauga, ON – L4X
                1M1).
              </strong>
              Note: Coupons are not applicable for some CLEARANCE items. You can
              only use one coupon per purchase and please watch the expiry date
              as these coupons are limited.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CouponsDeals
