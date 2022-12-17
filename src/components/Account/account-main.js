import React, { Fragment, useContext, useState } from 'react'
import { navigate } from 'gatsby'
import { Modal } from 'react-bootstrap'
import * as CheckPhone from 'phone'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'

import StoreContext from '~/context/StoreContext'
import GSIcon from '~/components/gs-icon'

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      lastName
      phone
      acceptsMarketing
      defaultAddress {
        firstName
        lastName
        address1
        address2
        city
        zip
        country
      }
    }
  }
`
const CUSTOMER_UPDATE = gql`
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      customer {
        acceptsMarketing
        email
        firstName
        lastName
        phone
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const Main = () => {
  const { customerAccessToken } = useContext(StoreContext),
    [acceptsMarketing, setAcceptsMarketing] = useState(null),
    [defaultAddress, setDefaultAddress] = useState(null),
    [email, setEmail] = useState(null),
    [firstName, setFirstName] = useState(null),
    [lastName, setLastName] = useState(null),
    [phone, setPhone] = useState(null),
    [editInfo, doEditInfo] = useState(false),
    { loading } = useQuery(CUSTOMER_INFO, {
      variables: {
        customerAccessToken: customerAccessToken.accessToken,
      },
      onCompleted: data => {
        if (data && data.customer) {
          const {
            customer: {
              acceptsMarketing,
              defaultAddress,
              email,
              firstName,
              lastName,
              phone,
            },
          } = data
          setAcceptsMarketing(acceptsMarketing)
          setDefaultAddress(defaultAddress)
          setEmail(email)
          setFirstName(firstName)
          setLastName(lastName)
          setPhone(phone)
        }
      },
    }),
    [updateCustomer] = useMutation(CUSTOMER_UPDATE, {
      onCompleted: data => {
        if (data) {
          const {
            customerUpdate: { customer },
          } = data
          if (customer !== null) {
            const { acceptsMarketing, email, firstName, lastName, phone } =
              customer
            setAcceptsMarketing(acceptsMarketing)
            setEmail(email)
            setFirstName(firstName)
            setLastName(lastName)
            setPhone(phone)
            doEditInfo(false)
          }
        }
      },
    }),
    toggleSubscription = setToValue => {
      updateCustomer({
        variables: {
          customerAccessToken: customerAccessToken.accessToken,
          customer: {
            acceptsMarketing: setToValue,
          },
        },
      })
    }

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
            <h1 className={'main-heading'}>My Account</h1>
          </div>
          <div className={'my-account-details'}>
            <p>Account Information</p>
            <div className={'contact row'}>
              <div className={'contact-information col-md-6 col-12'}>
                <h3>CONTACT INFORMATION</h3>
                <span>
                  <strong>Name:</strong>{' '}
                  <span>{`${firstName} ${lastName}`}</span>
                </span>
                <span>
                  <strong>Email:</strong> <span>{email}</span>
                </span>
                {phone && phone !== '' && (
                  <span>
                    <strong>Phone:</strong> <span>{phone}</span>
                  </span>
                )}
                <div className={'link'}>
                  <button
                    aria-label={'Edit Information'}
                    type={'button'}
                    onClick={() => doEditInfo(true)}
                  >
                    Edit Information
                  </button>
                </div>
                <Modal
                  className={'account-modal'}
                  show={editInfo}
                  onHide={() => doEditInfo(false)}
                  centered={true}
                >
                  <Modal.Body>
                    <button
                      type={'button'}
                      className={'btn-dismiss'}
                      onClick={() => doEditInfo(false)}
                    >
                      <GSIcon icon={'gs-x'} />
                    </button>
                    <form
                      className={'modal-form'}
                      onSubmit={event => {
                        event.preventDefault()
                        const new_name = event.target.name.value.split(' '),
                          last_Name = new_name.pop(),
                          first_Name = new_name.join(' '),
                          new_email = event.target.email.value,
                          new_phone = CheckPhone(
                            event.target.phone.value,
                            'CAN'
                          )[0]
                        updateCustomer({
                          variables: {
                            customerAccessToken:
                              customerAccessToken.accessToken,
                            customer: {
                              email: new_email,
                              firstName: first_Name,
                              lastName: last_Name,
                              phone: new_phone,
                            },
                          },
                        })
                      }}
                    >
                      <div className="form-header">
                        <h4>Edit Information</h4>
                      </div>
                      <div className="field mt-auto">
                        <input
                          type="text"
                          name="name"
                          aria-label="Name"
                          placeholder="Name"
                          defaultValue={`${firstName} ${lastName}`}
                          onChange={() => false && console.log('Name Changed')}
                        />
                      </div>
                      <div className="field mt-auto">
                        <input
                          type="email"
                          name="email"
                          aria-label="Email"
                          placeholder="Email"
                          defaultValue={email}
                          onChange={() => false && console.log('Email Changed')}
                        />
                      </div>
                      <div className="field mt-auto">
                        <input
                          type="tel"
                          name="phone"
                          aria-label="Mobile"
                          placeholder="Mobile"
                          defaultValue={phone}
                          onChange={() => false && console.log('Phone Changed')}
                        />
                      </div>
                      <div className="field d-flex justify-content-between mt-auto">
                        <button
                          type={'button'}
                          className={'btn-back dismiss flex-shrink-1'}
                          onClick={() => doEditInfo(false)}
                        >
                          CANCEL
                        </button>
                        <button
                          type={'submit'}
                          className={'btn-submit flex-grow-1'}
                        >
                          SAVE & CONTINUE
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
              <div className={'contact-information col-md-6 col-12'}>
                <h3>NEWSLETTER</h3>
                <span>
                  You are {acceptsMarketing ? 'subscribed' : 'unsubscribed'} to
                  our newsletter.
                </span>
                <div className={'link'}>
                  <button
                    type={'button'}
                    onClick={() => toggleSubscription(!acceptsMarketing)}
                  >
                    {acceptsMarketing ? 'Unsubscribe' : 'Subscribe'}
                  </button>
                </div>
              </div>
            </div>

            <p>Addresses</p>
            <div className={'contact row'}>
              {defaultAddress && (
                <div className={'contact-information col-md-6 col-12'}>
                  <h3>DEFAULT ADDRESS</h3>
                  {defaultAddress.firstName !== '' && (
                    <span>
                      {defaultAddress.firstName} {defaultAddress.lastName}
                    </span>
                  )}
                  {defaultAddress.address1 && (
                    <span>{defaultAddress.address1}</span>
                  )}
                  {defaultAddress.address2 && (
                    <span>{defaultAddress.address2}</span>
                  )}
                  <span>
                    {defaultAddress.zip}, {defaultAddress.city},{' '}
                    {defaultAddress.country}
                  </span>
                  <div className={'link'}>
                    <button
                      type={'button'}
                      onClick={() => navigate('/account/address-book/')}
                    >
                      Edit Addresses
                    </button>
                  </div>
                </div>
              )}
              <div className={'contact-information col-md-6 col-12'}>
                <h3>SHIPPING ADDRESS</h3>
                <span>This will be used as default shipping address.</span>
                <div className={'link'}>
                  <button
                    type={'button'}
                    onClick={() => navigate('/account/address-book/')}
                  >
                    Edit Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Main
