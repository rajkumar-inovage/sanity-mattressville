import React from 'react'

const PaymentMethodMain = () => {
  return (
    <div className={'account-main'}>
      <div className={'entry-header'}>
        <h1 className={'main-heading'}>Payment Methods</h1>
        <div className={'payment-method-details'}>
          <p>Payment Cards</p>
          <h5>Default Payment Method</h5>
          <div className={'contact row'}>
            <div className={'contact-information col-md-6 col-12'}>
              <span>Name:</span>
              <span>Card Number:</span>
              <span>Expiry Date:</span>
              <div className={'link'}>
                <button type={'button'}>Delete</button>
                <button type={'button'}>Add New Card</button>
              </div>
            </div>

            <div className={'contact-information col-md-6 col-12'}>
              <span>Visa</span>
              <span>*************4567</span>
              <span>10/2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodMain
