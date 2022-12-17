import React from 'react'
import PropTypes from 'prop-types'

import ContextProvider from '~/provider/ContextProvider'

import Header from '~/components/header'
import Footer from '~/components/footer'

const Layout = ({ children }) => {
  return (
    <ContextProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
