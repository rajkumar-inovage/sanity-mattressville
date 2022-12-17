import React, { useState } from 'react'
// import { Link } from 'gatsby'

const ExtendedBanner = () => {
  const [show, setShow] = useState(true)

  return show ? (
    <div className={'extended-banner'}>
      <div className={'extended-banner-content d-flex'}>
        <p>
          {'Boxing Day Mattress Sale On Now! '}  <a style={{color: "white", textDecoration: "underline"}} href="/local-flyer/current-local-flyer/">View Flyer</a> 
          {' | Financing Available: Buy Now, Pay Over Time! Select AFFIRM at Checkout.'}
        </p>
        <button onClick={() => setShow(false)} type={'button'}>
          Dismiss
        </button>
      </div>
    </div>
  ) : null
}

export default ExtendedBanner
