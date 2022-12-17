import React, { Fragment, useContext, useState } from 'react'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import StoreContext from '~/context/StoreContext'
import AddAddressForm from '~/components/Account/adresses/addAddressForm'
import DeleteAddress from '~/components/Account/adresses/deleteAddress'
import EditAddressForm from '~/components/Account/adresses/editAddressForm'

const CUSTOMER_ADDRESS = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        id
      }
      addresses(first: 250) {
        edges {
          node {
            id
            address1
            address2
            city
            phone
            lastName
            firstName
            country
            name
            zip
          }
        }
      }
    }
  }
`

const AddressBookMain = () => {
  const { customerAccessToken } = useContext(StoreContext),
    [defaultAddress, setDefaultAddress] = useState(null),
    [addresses, setAddresses] = useState(null),
    { loading } = useQuery(CUSTOMER_ADDRESS, {
      variables: {
        customerAccessToken: customerAccessToken.accessToken,
      },
      onCompleted: data => {
        if (data) {
          const {
            customer: { defaultAddress, addresses },
          } = data
          setDefaultAddress(defaultAddress)
          setAddresses(addresses)
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
            <h1 className={'main-heading'}>Address Book</h1>
          </div>

          <div className={'address-book-details'}>
            <p>Account Information</p>
            <div className={'contact row'}>
              <div className={'col-12'}>
                <div className={'contact-information'}>
                  <h3>BILLING ADDRESS</h3>
                  {addresses != null &&
                    addresses.edges.map((address, index) => {
                      return (
                        <div className={'row'} key={address.node.id}>
                          <div className={'col-md-6'}>
                            <div className={'contact-information'}>
                              <h5>{`Address ${index + 1}`}</h5>
                              {address.node.firstName !== '' && (
                                <span>
                                  {address.node.firstName}{' '}
                                  {address.node.lastName}
                                </span>
                              )}
                              {address.node.address1 && (
                                <span>{address.node.address1}</span>
                              )}
                              {address.node.address2 && (
                                <span>{address.node.address2}</span>
                              )}
                              <span>
                                {address.node.zip}, {address.node.city},{' '}
                                {address.node.country}
                              </span>
                              <div className={'link mb-3'}>
                                <EditAddressForm
                                  address={address.node}
                                  isDefault={
                                    defaultAddress.id === address.node.id
                                  }
                                />
                                <DeleteAddress id={address.node.id} />
                              </div>
                            </div>
                          </div>
                          {defaultAddress.id === address.node.id && (
                            <div className={'col-md-6'}>
                              <div className={'contact-information'}>
                                <h5>Default Shipping Address</h5>
                                <span>
                                  This is set as default shipping address.
                                </span>
                                <div className={'link'}>
                                  <AddAddressForm />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default AddressBookMain
