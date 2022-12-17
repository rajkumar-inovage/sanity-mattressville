import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import Logout from './logout'
import GSIcon from '~/components/gs-icon'

const SideBar = () => {
  const [sidebar, setSidebar] = useState(false)

  const accordion = () => {
    setSidebar(!sidebar)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.querySelectorAll('.menu-wrapper li a').forEach(element => {
        if (window.location.pathname === element.getAttribute('href'))
          element.classList.add('active')
      })
    }
  }, [])

  return (
    <div className={'side-bar'}>
      <div className={'bread-crumb'}>
        <Link className={'home'} to={'/'}>
          Home
        </Link>
        <GSIcon icon={'gs-chevron-right'} />
        <span>{'Personal Account'}</span>
      </div>
      <div className={'menu-wrapper mobile-display'}>
        <div
          className={sidebar ? 'header' : 'header show'}
          onClick={() => accordion()}
          onKeyDown={() => accordion()}
          role={'button'}
          tabIndex={'0'}
        >
          <h2>{'Personal Account'}</h2>
        </div>
        {sidebar ? (
          <ul className={'menu'}>
            <li>
              <Link to={'/account/'}>{'My Account'}</Link>
            </li>
            <li>
              <Link to={'/account/orders/'}>{'My Orders'}</Link>
            </li>
            <li>
              <Link to={'/account/address-book/'}>{'Address Book'}</Link>
            </li>
            <li className={'d-none'}>
              <Link to={'/account/payment-methods/'}>{'Payment Methods'}</Link>
            </li>
            <li className={'d-none'}>
              <Link to={'/account/product-reviews/'}>{'Product Reviews'}</Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
      <div className={'menu-wrapper desktop-display'}>
        <div className={'header'}>
          <h2>{'Personal Account'}</h2>
        </div>
        <ul className={'menu'}>
          <li>
            <Link to={'/account/'}>{'My Account'}</Link>
          </li>
          <li>
            <Link to={'/account/orders/'}>{'My Orders'}</Link>
          </li>
          <li>
            <Link to={'/account/address-book/'}>{'Address Book'}</Link>
          </li>
          <li className={'d-none'}>
            <Link to={'/account/payment-methods/'}>{'Payment Methods'}</Link>
          </li>
          <li className={'d-none'}>
            <Link to={'/account/product-reviews/'}>{'Product Reviews'}</Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
