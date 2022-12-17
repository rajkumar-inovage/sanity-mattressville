import React, { Fragment, useEffect, useState } from 'react'

import Desktop from './desktop'
import Tablet from './tablet'

// import ToTop from '~/components/to-top'

const Footer = () => {
  const [isTablet, setTablet] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        setTablet(window.outerWidth < 992 ? true : false)
      })
    }
  }, [setTablet])

  return (
    <Fragment>
      {/* <ToTop /> */}
      {isTablet ? <Tablet /> : <Desktop />}
    </Fragment>
  )
}

export default Footer
