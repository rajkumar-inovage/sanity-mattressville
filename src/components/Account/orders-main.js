import React, { Fragment, useContext, useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import StoreContext from '~/context/StoreContext'
import FormatDate from '~/components/functions/format-date'
import GetPrice from '~/components/functions/get-price'

const CUSTOMER_ORDERS = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ordersData: orders(first: 250) {
        orders: edges {
          order: node {
            name
            customerLocale
            orderNumber
            totalPrice
            subtotalPrice
            processedAt
            statusUrl
            financialStatus
            fulfillmentStatus
            currencyCode
            itemsData: lineItems(first: 250) {
              orderItems: edges {
                item: node {
                  title
                  quantity
                  variant {
                    id
                    image {
                      url
                    }
                    selectedOptions {
                      value
                      name
                    }
                    priceV2 {
                      amount
                    }
                  }
                }
              }
            }
            shippingAddress {
              address1
              city
              lastName
              firstName
              zip
              country
            }
          }
        }
      }
    }
  }
`

const OrdersMain = () => {
  const { customerAccessToken } = useContext(StoreContext),
    [orders, updateOrders] = useState([]),
    { loading } = useQuery(CUSTOMER_ORDERS, {
      variables: {
        customerAccessToken: customerAccessToken.accessToken,
      },
      onCompleted: data => {
        if (data) {
          const {
            customer: { ordersData },
          } = data
          ordersData && updateOrders(ordersData.orders)
        }
      },
    })

  return (
    <div className={'account-main'}>
      {loading ? (
        <div
          className={'d-flex h-100 justify-content-center align-items-center'}
        >
          <div
            className={'spinner-grow'}
            style={{ width: '3rem', height: '3rem' }}
            role={'status'}
          >
            <span className={'sr-only'}>Fetching...</span>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className={'entry-header'}>
            <h1 className={'main-heading'}>My Orders</h1>
          </div>
          <div className={'my-orders'}>
            <div className={'header d-none d-lg-flex'}>
              <p>ORDER DATE</p>
              <p>ORDER NUMBER</p>
              <p>STATUS</p>
              <p>TRACKING</p>
            </div>
            <Accordion>
              {orders &&
                orders.length &&
                orders.map(
                  (
                    {
                      order: {
                        name,
                        orderNumber,
                        itemsData: { orderItems },
                        processedAt,
                        statusUrl,
                        financialStatus,
                        fulfillmentStatus,
                      },
                    },
                    i
                  ) => {
                    return (
                      <Card key={i}>
                        <Accordion.Toggle
                          as={'div'}
                          variant="link"
                          eventKey={name}
                          className={'toggle-button'}
                        >
                          <div className={'header d-lg-none'}>
                            <p>ORDER DATE</p>
                            <p>ORDER NUMBER</p>
                            <p>STATUS</p>
                            <p>TRACKING</p>
                          </div>
                          <div className={'accordion-list'}>
                            <span>
                              {FormatDate(
                                new Date(processedAt),
                                'dd MMMM yyyy'
                              )}
                            </span>
                            <span>{orderNumber}</span>
                            <span>{financialStatus}</span>
                            <a
                              href={statusUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Check Status
                            </a>
                            <button type="button" className={'btn'}>
                              SEE MORE
                            </button>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={name}>
                          <Card.Body>
                            <div className={'cart-items'}>
                              <div className={'items-list'}>
                                <div
                                  className={
                                    'col-heading row mx-n2 d-none d-lg-flex no-gutters'
                                  }
                                >
                                  <div className={'th item-name col px-2'}>
                                    Item
                                  </div>
                                  <div
                                    className={
                                      'th item-size col-2 text-left px-2'
                                    }
                                  >
                                    {orderItems &&
                                      orderItems.length &&
                                      orderItems[0].item &&
                                      orderItems[0].item.variant &&
                                      orderItems[0].item.variant
                                        .selectedOptions[0].name}
                                  </div>
                                  <div
                                    className={
                                      'th item-quantity col-2 text-left px-2'
                                    }
                                  >
                                    Quantity
                                  </div>
                                  <div
                                    className={
                                      'th item-price col-2 text-left px-2'
                                    }
                                  >
                                    Amount
                                  </div>
                                </div>
                                {orderItems &&
                                  orderItems.length &&
                                  orderItems.map(({ item }, j) => {
                                    return (
                                      <div
                                        key={j}
                                        className={
                                          'items-row mx-n2 d-block d-flex no-gutters'
                                        }
                                      >
                                        <div
                                          className={
                                            'item-meta col d-flex px-2'
                                          }
                                        >
                                          <div className={'item-image'}>
                                            {item.variant &&
                                              item.variant.image && (
                                                <img
                                                  loading={'lazy'}
                                                  src={item.variant.image.url}
                                                  style={{
                                                    maxWidth: '50px',
                                                    height: 'auto',
                                                  }}
                                                  alt={`variant-${j}`}
                                                />
                                              )}
                                          </div>
                                          <div className={'text item-name'}>
                                            <p>{item.title}</p>
                                            {item.variant &&
                                              item.variant
                                                .selectedOptions[1] && (
                                                <strong>
                                                  {
                                                    item.variant
                                                      .selectedOptions[1].value
                                                  }
                                                </strong>
                                              )}
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            'text item-size mt-3 mt-lg-0 col-12 col-lg-2 text-right text-lg-left px-2'
                                          }
                                        >
                                          {item.variant && (
                                            <Fragment>
                                              <strong
                                                className={
                                                  'size-label d-lg-none pr-4'
                                                }
                                              >
                                                {`${item.variant.selectedOptions[0].name}:`}
                                              </strong>{' '}
                                              <span>
                                                {
                                                  item.variant
                                                    .selectedOptions[0].value
                                                }
                                              </span>
                                            </Fragment>
                                          )}
                                        </div>
                                        <div
                                          className={
                                            'text item-quantity col-2 text-left px-2'
                                          }
                                        >
                                          <span>{item.quantity}</span>
                                        </div>
                                        <div
                                          className={
                                            'text item-price col-2 text-left px-2'
                                          }
                                        >
                                          {GetPrice(
                                            item.variant.priceV2.amount
                                          )}
                                        </div>
                                      </div>
                                    )
                                  })}
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    )
                  }
                )}
            </Accordion>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default OrdersMain
