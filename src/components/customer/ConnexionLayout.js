import React, { Fragment, useContext } from 'react'
import { navigate } from 'gatsby'

import StoreContext from '~/context/StoreContext'

const ConnexionLayout = props => {
  const { customerAccessToken } = useContext(StoreContext)
  const isAuthenticated =
    customerAccessToken &&
    customerAccessToken.expiresAt &&
    customerAccessToken.expiresAt > new Date().toISOString()
      ? true
      : false

  return (
    <Fragment>
      {isAuthenticated
        ? typeof window !== 'undefined'
          ? navigate(`/account/`)
          : null
        : props.children}
    </Fragment>
  )
}

export default ConnexionLayout
