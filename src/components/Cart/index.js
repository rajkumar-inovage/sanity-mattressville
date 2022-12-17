import React, { useEffect, useContext, useState, Fragment } from 'react'
import { Nav, Modal, Tab } from 'react-bootstrap'
import { Link } from 'gatsby'

import GetPrice from '~/components/functions/get-price'
import GSIcon from '~/components/gs-icon'
import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'
import Shipping from './Shipping'

const Cart = () => {
  const {
      applyCoupon,
      removeCoupon,
      store: { client, checkout },
    } = useContext(StoreContext),
    removeCouponCode = () => {
      removeCoupon(client, checkout.id)
    },
    applyCouponCode = () => {
      const { value } = document.querySelector('.add-coupon')
      if (value !== '') {
        applyCoupon(client, checkout.id, value)
        document.querySelector('.add-coupon').value = ''
      }
    },
    handleCheckout = () => {
      window.location.href = checkout.webUrl.replace(
        'mattress-ville.myshopify.com',
        'shop.mattressville.ca'
      )
    },
    [addressPopUp, displayAddressPopUp] = useState(false),
    [shippingAddress, setShippingAddress] = useState(null),
    closeAddressPopUp = () => displayAddressPopUp(false),
    showAddressPopUp = () => displayAddressPopUp(true)

  useEffect(() => {
    checkout &&
      checkout.shippingAddress &&
      setShippingAddress(checkout.shippingAddress)
  }, [checkout])

  return (
    <Fragment>
      <div className={'cart-page'}>
        <div className={'container-fluid'}>
          <div className={'entry-title'}>
            <div className={'bread-crumb'}>
              <Link className={'home'} to={'/'}>
                Home
              </Link>
              <GSIcon icon={'gs-chevron-right'} />
              <span>My Cart</span>
            </div>
            <div className={'page-title'}>
              <h1>Cart Items</h1>
            </div>
          </div>

          {checkout.lineItems && checkout.lineItems.length ? (
            <Fragment>
              <div className={'cart-items'}>
                <div className={'items-list'}>
                  <div className={'col-heading d-none d-lg-flex no-gutters'}>
                    <div className={'th item-name col-5'}>Item</div>
                    <div className={'th item-size col-2 text-left'}>Size</div>
                    <div className={'th item-quantity col-2 text-left'}>
                      Quantity
                    </div>
                    <div className={'th item-price col-1 text-left'}>Price</div>
                    <div className={'th item-name col-2 text-right'}>
                      Subtotal
                    </div>
                  </div>
                  {checkout.lineItems.map(item => (
                    <LineItem key={item.id.toString()} item={item} />
                  ))}
                </div>
              </div>

              <div className={'row mx-0'}>
                <div
                  className={
                    'col-12 col-md-7 align-self-center disclaimer order-1 order-md-0'
                  }
                >
                  <h4>PICK UP & DELIVERY DISCLAIMER</h4>
                  <h5>DELIVERY</h5>
                  <ol>
                    <li>
                      FREE delivery on orders over $499. There is a $60
                      surcharge on orders under $499
                    </li>
                    <li>
                      Delivery times vary. You will be contacted by customer
                      service within 24 hours to schedule your delivery.
                    </li>
                  </ol>
                  <h5>PICKUP</h5>
                  <ol>
                    <li>
                      Pickup location is at the Mississauga store located at
                      1911 Dundas St E unit 18, Mississauga, ON L4X 1M1
                    </li>
                    <li>
                      After your purchase is made, you will be contacted by
                      customer service to inform you when the items are ready to
                      be picked up
                    </li>
                  </ol>
                </div>
                <div className={'col-12 col-md-5 order-0 order-md-1'}>
                  <div className={'subtotal-box'}>
                    <div className={'no-gutters'}>
                      <p className={'entry-heading'}>CART TOTALS</p>
                      <div className={'coupon-box'}>
                        <div className={'coupon-code'}>
                          <input
                            type="text"
                            aria-label="Discount Code"
                            className="add-coupon"
                            placeholder="Enter Coupon Code"
                          />
                          <button
                            className="apply-coupon"
                            type="button"
                            aria-label="Apply Coupon Code"
                            onClick={applyCouponCode}
                          >
                            Apply
                          </button>
                        </div>
                        {checkout.discountApplications.map(
                          ({ code, title }, index) => {
                            return (
                              <React.Fragment key={index}>
                                <div className={'applied-code'}>
                                  <p>{code && code !== '' ? code : title}</p>
                                  {code && (
                                    <button
                                      type="button"
                                      className={'remove-coupon'}
                                      onClick={removeCouponCode}
                                    >
                                      <GSIcon icon={'gs-x-circle'} />
                                    </button>
                                  )}
                                </div>
                                {/* {code === 'BOXINGDAY21' ? (
                                  <div className="offer-notice">
                                    <p>
                                      A free pillow will be sent automatically
                                      with the purchase of a mattress.
                                    </p>
                                  </div>
                                ) : (
                                  ''
                                )} */}
                              </React.Fragment>
                            )
                          }
                        )}
                        {checkout?.userErrors && (
                          <p className={'coupon-error text-danger'}>
                            {checkout?.userErrors?.pop()?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={'row mx-0 no-gutters'}>
                      <div className={'col-3'}>
                        <strong>Subtotal</strong>
                      </div>
                      <div className={'col-9'}>
                        <span>{GetPrice(checkout.subtotalPrice.amount)}</span>
                      </div>
                    </div>
                    <div className={'row mx-0 no-gutters'}>
                      <div className={'col-3'}>
                        <strong>Shipping</strong>
                      </div>
                      <div className={'col-9'}>
                        <div className={'enter-address'}>
                          {shippingAddress ? (
                            <Fragment>
                              <p>
                                <strong>Ship To:</strong>
                                {shippingAddress.formatted.join(', ')}
                              </p>
                              <p>
                                <strong>Charge:</strong>
                                {'Will be calculated at checkout'}
                              </p>
                            </Fragment>
                          ) : (
                            <p>
                              {'Enter your address to view shipping options.'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {shippingAddress === null && (
                      <div className={'row mx-0 no-gutters'}>
                        <div className={'col-9 offset-3'}>
                          <button
                            className={'calculate'}
                            onClick={() => showAddressPopUp()}
                          >
                            Calculate Shipping
                          </button>
                        </div>
                      </div>
                    )}
                    <div className={'row mx-0 no-gutters'}>
                      <div className={'col-3'}>
                        <strong>HST</strong>
                      </div>
                      <div className={'col-9'}>
                        <span>{GetPrice(checkout.totalTax.amount)}</span>
                      </div>
                    </div>
                    <div className={'row mx-0 no-gutters'}>
                      <div className={'col-3'}>
                        <strong>Total</strong>
                      </div>
                      <div className={'col-9'}>
                        <strong>{GetPrice(checkout.totalPrice.amount)}</strong>
                      </div>
                    </div>
                    <div className={'row mx-0 checkout-btn'}>
                      <button
                        onClick={handleCheckout}
                        disabled={checkout.lineItems.length === 0}
                      >
                        CHECKOUT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className={'empty-cart'}>
                <h3>Your cart is currently empty.</h3>
                <Link className={'go-to-shop'} to={'/all-products/'}>
                  RETURN TO SHOP PAGE
                </Link>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <Modal
        className={'account-modal'}
        show={addressPopUp}
        onHide={closeAddressPopUp}
        centered={true}
      >
        <Modal.Body>
          <button
            type={'button'}
            className={'btn-dismiss'}
            onClick={closeAddressPopUp}
          >
            <GSIcon icon={'gs-x'} />
          </button>
          <Tab.Container defaultActiveKey={'address'}>
            <Nav>
              <Nav.Item>
                <Nav.Link eventKey={'address'}>Shipping Address</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey={'address'} mountOnEnter={true}>
                <Shipping doDismiss={closeAddressPopUp} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default Cart
