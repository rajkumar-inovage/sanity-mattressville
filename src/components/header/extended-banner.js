import React, { useState } from 'react'
//import { Link } from 'gatsby'
import OfferText from '~/components/constants/offerText'

const ExtendedBanner = () => {
  const [show, setShow] = useState(true),
    { offer } = OfferText()

  return show ? (
    <div className={'extended-banner'}>
      <div className={'extended-banner-content d-flex'}>
        <p>{offer.overview[0].children[0].text}</p>
        <button onClick={() => setShow(false)} type={'button'}>
          Dismiss
        </button>
      </div>
    </div>
  ) : null
}

export default ExtendedBanner
