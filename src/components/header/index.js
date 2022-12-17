import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import {
  Button,
  Dropdown,
  Form,
  FormControl,
  Modal,
  Nav,
  Navbar,
  Tab,
} from 'react-bootstrap'
import { useIsMounted } from 'react-tidy'

import GetPrice from '~/components/functions/get-price'
import StoreContext from '~/context/StoreContext'
import HeaderData from '~/components/constants/header-data'
import GSIcon from '~/components/gs-icon'

import MainMenu from './main-menu'
import Login from './login'
import Register from './register'
import ExtendedBanner from './extended-banner'


const Header = () => {
  const { topHeader, middleHeader, mainMenu } = HeaderData(),
    
    countQuantity = lineItems => {
      let quantity = 0
      lineItems.forEach(item => {
        quantity = quantity + item.quantity
      })
      return quantity
    },
    {
      customerAccessToken,
      store: {
        checkout: { lineItems, subtotalPrice },
      },
    } = useContext(StoreContext),
    isAuthenticated =
      customerAccessToken &&
      customerAccessToken.expiresAt &&
      customerAccessToken.expiresAt > new Date().toISOString()
        ? true
        : false,
    [searchQuery, setSearchQuery] = useState(''),
    [quantity, setQuantity] = useState(
      countQuantity(lineItems ? lineItems : [])
    ),
    isMounted = useIsMounted(),
    [isTablet, setTablet] = useState(false),
    [show, setShow] = useState(false),
    [showBanner, setShowBanner] = useState(false),
    handleClose = () => setShow(false),
    handleShow = () => setShow(true),
    toggleDropDown = () => {
      const btnToggle = document.querySelector(
          'header .bottom-header .main-nav .mobile-bottom .btn-toggle'
        ),
        mainMenu = document.querySelector(
          'header .bottom-header .main-nav .main-menu'
        )
      btnToggle.classList.toggle('collapsed')
      mainMenu.classList.toggle('show')
    }

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search),
        btnToggle = document.querySelector(
          'header .bottom-header .main-nav .mobile-bottom .btn-toggle'
        ),
        mainMenu = document.querySelector(
          'header .bottom-header .main-nav .main-menu'
        ),
        navLinks = document.querySelectorAll(
          'header .bottom-header .main-nav .main-menu .nav-area .nav-item .nav-link:not(.dropdown-toggle)'
        ),
        cartReturns = document.querySelectorAll(
          'header .cart-list .cart-return a'
        ),
        miniCart = document.querySelectorAll('header .mini-cart')
      params.get('s') && setSearchQuery(params.get('s'))
      setQuantity(countQuantity(lineItems ? lineItems : []))
      setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        setTablet(window.outerWidth < 992 ? true : false)
      })
      navLinks.forEach(navLink => {
        navLink.addEventListener('click', () => {
          btnToggle.classList.remove('collapsed')
          mainMenu.classList.remove('show')
        })
      })
      cartReturns.forEach((cartReturn, index) => {
        cartReturn.addEventListener('click', () => {
          miniCart[index].querySelector('.dropdown').classList.remove('show')
          miniCart[index]
            .querySelector('.dropdown .dropdown-menu')
            .classList.remove('show')
        })
      })
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [isMounted, lineItems, setTablet])

  return (
    <Fragment>
      <header>
        {showBanner && <ExtendedBanner />}
        <div className={'top-header d-none d-lg-block'}>
          <div className={'container-fluid'}>
            <div className={`d-flex`}>
              <div className={`flex-shrink-1 my-auto`}>
                <Link to={'/'} className={`logo`}>
                  <img
                    loading={'lazy'}
                    src={
                      topHeader.siteLogo.childImageSharp.gatsbyImageData.images
                        .fallback.src
                    }
                    alt={topHeader.altText}
                    height={
                      topHeader.siteLogo.childImageSharp.gatsbyImageData.height
                    }
                    width={`auto`}
                  />
                </Link>
              </div>
              <div className={'flex-grow-1'}>
                <Form inline className={`search-box`} action={'/search'}>
                  <Button
                    variant={'default'}
                    className={'flex-shrink-1 btn-search'}
                    type={'submit'}
                    aria-label={'Search'}
                  >
                    <GSIcon icon={topHeader.searchIcon} />
                  </Button>
                  <FormControl
                    type={'text'}
                    name={'s'}
                    required={true}
                    placeholder={topHeader.searchPlaceholder}
                    onChange={({ target: { value } }) => setSearchQuery(value)}
                    className={`search-input flex-grow-1 border-0`}
                    value={searchQuery}
                  />
                </Form>
              </div>
              <div className={`flex-shrink-1`}>
                <ul className={`top-right-menu`}>
                  <li className={'social-media'}>
                    {topHeader.socialMedia.map(({ link, icon }, index) => (
                      <a
                        href={link}
                        target={'_blank'}
                        rel={'noreferrer nofollow'}
                        key={index}
                      >
                        <GSIcon icon={icon} />
                      </a>
                    ))}
                  </li>
                  <li className={'mini-cart'}>
                    <Dropdown
                      autoclose={'inside'}
                      align={'end'}
                      drop={'down'}
                      onToggle={e => false && console.log(e)}
                    >
                      <Dropdown.Toggle as={'a'}>
                        <span
                          className={'icon-wrapper'}
                          quantity={quantity < 10 ? quantity : `9+`}
                        >
                          <GSIcon icon={topHeader.cartIcon} />
                        </span>
                        <span>{topHeader.cartLabel}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu renderOnMount={true}>
                        <div className={'wrapper'}>
                          <div className={'cart-content'}>
                            {lineItems.length > 0 ? (
                              <ul className={'cart-list'}>
                                {lineItems.map((lineItem, index) => (
                                  <li key={index} className={'cart-item'}>
                                    <div className={'item-image'}>
                                      <img
                                        alt={`variant-${index}`}
                                        src={lineItem.variant.image.src}
                                      />
                                    </div>
                                    <div className={'item-content'}>
                                      <div className="item-name">
                                        <strong>{lineItem.title}</strong>
                                      </div>
                                      <span className={'item-amount'}>
                                        <span
                                          className={'item-qty'}
                                        >{`Qty: ${lineItem.quantity}`}</span>
                                        <span className={'money'}>
                                          {GetPrice(
                                            lineItem.quantity *
                                              lineItem.variant.price.amount
                                          )}
                                        </span>
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <Fragment>
                                <ul className={'cart-list'}>
                                  <li className={'cart-empty'}>
                                    No products in the cart.
                                  </li>
                                </ul>
                                <Link
                                  className={'cart-return'}
                                  to={'/all-products/'}
                                >
                                  Return To Shop
                                </Link>
                              </Fragment>
                            )}
                            {lineItems.length > 0 && (
                              <div className={'cart-meta'}>
                                <hr className={'cart-rule'} />
                                <div className={'cart-total'}>
                                  <strong>Subtotal</strong>
                                  <span className={'money'}>
                                    {GetPrice(subtotalPrice.amount)}
                                  </span>
                                </div>
                                <Dropdown.Item
                                  as={'div'}
                                  className={'cart-actions'}
                                >
                                  <Link to={'/all-products/'}>
                                    Continue Shopping
                                  </Link>
                                  <Link to={'/cart/'} className={'btn-cart'}>
                                    View cart
                                  </Link>
                                </Dropdown.Item>
                              </div>
                            )}
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li className={`d-none`}>
                    {isAuthenticated ? (
                      <Link to={'/account/'}>
                        <span className={'icon-wrapper'}>
                          <GSIcon icon={topHeader.userIcon} />
                        </span>
                        <span>{topHeader.myAccountLabel}</span>
                      </Link>
                    ) : (
                      <button onClick={handleShow} aria-label={'Login'}>
                        <span className={'icon-wrapper'}>
                          <GSIcon icon={'gs-log-in'} />
                        </span>
                        <span>{'Login'}</span>
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={'middle-header d-flex'}>
          <div className={`container-fluid`}>
            <div className={`row`}>
              <div className={`col d-none d-lg-block`}>
                <div className={`contact-via`}>
                  <a href={`tel:${middleHeader.phoneNumber}`}>
                    <GSIcon icon={middleHeader.phoneIcon} />
                    <span>{middleHeader.phoneNumber}</span>
                  </a>
                  <Link to={middleHeader.link}>
                    <span>{middleHeader.contact}</span>
                  </Link>
                </div>
              </div>
              <div className={`col-lg-3 offer text-center text-lg-right`}>
                <p>{middleHeader.offer}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={'bottom-header'}>
          <div className={`container-fluid`}>
            <Navbar bg={'transparent'} className={'main-nav'} expand={'lg'}>
              <div className={'mobile-middle'}>
                <Link to={'/'} className={`logo`}>
                  <img
                    loading={'lazy'}
                    src={
                      topHeader.siteLogo.childImageSharp.gatsbyImageData.images
                        .fallback.src
                    }
                    alt={topHeader.altText}
                    height={
                      topHeader.siteLogo.childImageSharp.gatsbyImageData.height
                    }
                    width={
                      topHeader.siteLogo.childImageSharp.gatsbyImageData.width
                    }
                    className={'img-fluid'}
                    style={{ margin: '10px 0' }}
                  />
                </Link>
                <div className={'flex-grow-1 h-100 w-100'}>
                  <Form
                    inline
                    className={`search-box h-100`}
                    action={'/search'}
                  >
                    <Button
                      variant={'default'}
                      className={'flex-shrink-1 btn-search'}
                      type={'submit'}
                      aria-label={'Search'}
                    >
                      <GSIcon icon={topHeader.searchIcon} />
                    </Button>
                    <div className={'flex-grow-1'}>
                      <FormControl
                        type={'text'}
                        name={'s'}
                        required={true}
                        placeholder={topHeader.searchPlaceholder}
                        onChange={({ target: { value } }) =>
                          setSearchQuery(value)
                        }
                        className={`search-input border-0`}
                        value={searchQuery}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              <div className={'mobile-bottom'}>
                <div className={'flex-grow-1'}>
                  <button
                    type={'button'}
                    className={'btn-toggle navbar-toggler'}
                    aria-label={'Toggle Nav Drop Down'}
                    onClick={() => toggleDropDown()}
                  >
                    <span className={'stripe'} />
                    <span className={'stripe'} />
                    <span className={'stripe'} />
                  </button>
                </div>
                <div className={'flex-shrink-1'}>
                  <ul className={`mobile-bottom-right`}>
                    <li className={'mini-cart'}>
                      <Dropdown
                        autoclose={'inside'}
                        align={'end'}
                        drop={'down'}
                        onToggle={e => false && console.log(e)}
                      >
                        <Dropdown.Toggle as={'a'}>
                          <span
                            className={'icon-wrapper'}
                            quantity={quantity < 10 ? quantity : `${quantity}+`}
                          >
                            <GSIcon icon={topHeader.cartIcon} />
                          </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu renderOnMount={true}>
                          <div className={'wrapper'}>
                            <div className={'cart-content'}>
                              {lineItems.length > 0 ? (
                                <ul className={'cart-list'}>
                                  {lineItems.map((lineItem, index) => (
                                    <li key={index} className={'cart-item'}>
                                      <div className={'item-image'}>
                                        <img
                                          alt={`variant-${index}`}
                                          src={lineItem.variant.image.src}
                                        />
                                      </div>
                                      <div className={'item-content'}>
                                        <div className="item-name">
                                          <strong>{lineItem.title}</strong>
                                        </div>
                                        <span className={'item-amount'}>
                                          <span
                                            className={'item-qty'}
                                          >{`Qty: ${lineItem.quantity}`}</span>
                                          <span className={'money'}>
                                            {GetPrice(
                                              lineItem.quantity *
                                                lineItem.variant.price
                                            )}
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <ul className={'cart-list'}>
                                  <li className={'cart-empty'}>
                                    No products in the cart.
                                  </li>
                                  <li className={'cart-return'}>
                                    <Link to={'/all-products/'}>
                                      Return To Shop
                                    </Link>
                                  </li>
                                </ul>
                              )}
                              {lineItems.length > 0 && (
                                <div className={'cart-meta'}>
                                  <hr className={'cart-rule'} />
                                  <div className={'cart-total'}>
                                    <strong>Subtotal</strong>
                                    <span className={'money'}>
                                      {GetPrice(subtotalPrice)}
                                    </span>
                                  </div>
                                  <Dropdown.Item
                                    as={'div'}
                                    className={'cart-actions'}
                                  >
                                    <Link to={'/all-products/'}>
                                      Continue Shopping
                                    </Link>
                                    <Link to={'/cart/'} className={'btn-cart'}>
                                      View cart
                                    </Link>
                                  </Dropdown.Item>
                                </div>
                              )}
                            </div>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                    <li className={`d-none`}>
                      {isAuthenticated ? (
                        <Link to={'/account/'}>
                          <span className={'icon-wrapper'}>
                            <GSIcon icon={topHeader.userIcon} />
                          </span>
                        </Link>
                      ) : (
                        <button onClick={handleShow} aria-label={'Login'}>
                          <span className={'icon-wrapper'}>
                            <GSIcon icon={'gs-log-in'} />
                          </span>
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <Navbar.Collapse className={'main-menu'}>
                <Nav className={'nav-area'}>
                  {mainMenu && (
                    <MainMenu isTablet={isTablet} menuData={mainMenu} />
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </header>
      {!isAuthenticated && (
        <Modal
          className={'account-modal'}
          show={show}
          onHide={handleClose}
          centered={true}
        >
          <Modal.Body>
            <button
              type={'button'}
              className={'btn-dismiss'}
              onClick={handleClose}
            >
              <GSIcon icon={'gs-x'} />
            </button>
            <Tab.Container defaultActiveKey={'login'}>
              <Nav>
                <Nav.Item>
                  <Nav.Link eventKey={'login'}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={'register'}>Registration</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey={'login'} mountOnEnter={true}>
                  <Login doDismiss={handleClose} />
                </Tab.Pane>
                <Tab.Pane eventKey={'register'} mountOnEnter={true}>
                  <Register doDismiss={handleClose} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      )}
    </Fragment>
  )
}

export default Header
