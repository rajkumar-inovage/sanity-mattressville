import React from 'react'
import { Link } from 'gatsby'

import GSIcon from '~/components/gs-icon'

const Breadcrumb = ({ productType }) => (
  <div className={'bread-crumb'}>
    <Link className={'home'} to={'/'}>
      Home
    </Link>
    <GSIcon icon={'gs-chevron-right'} />
    <Link
      className={'home'}
      to={productType === 'Mattresses' ? '/all-mattresses/' : '/accessories/'}
    >
      {productType === 'Mattresses' ? 'All Mattresses' : 'All Accessories'}
    </Link>
  </div>
)

export default Breadcrumb
