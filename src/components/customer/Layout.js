import React, { Fragment, useContext } from 'react'
import { navigate } from 'gatsby'

import StoreContext from '~/context/StoreContext'

const Layout = props => {
  const { customerAccessToken } = useContext(StoreContext)
  let isAuthenticated = false
  customerAccessToken != null &&
    (isAuthenticated =
      customerAccessToken &&
      customerAccessToken.expiresAt &&
      customerAccessToken.expiresAt > new Date().toISOString() &&
      true)

  return (
    <Fragment>
      {!isAuthenticated
        ? typeof window !== 'undefined'
          ? navigate(`/`)
          : null
        : props.children}
    </Fragment>
  )
}

export default Layout
