import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Modal } from 'react-bootstrap'
import GSIcon from '~/components/gs-icon'
import StoreContext from '~/context/StoreContext'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import axios from 'axios'

const CUSTOMER_EDIT_ADDRESS = gql`
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $id
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const CUSTOMER_EDIT_DEFAULT_ADDRESS = gql`
  mutation customerDefaultAddressUpdate(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const EditAddressForm = ({ address, isDefault }) => {
  const [editAddressForm, setEditAdressForm] = useState(false)
  const [firstName, setFirstName] = useState(address.firstName)
  const [lastName, setLastName] = useState(address.lastName)
  const [companyInput, setCompanyInput] = useState(address.company)
  const [addressInput, setAddressInput] = useState(address.address1)
  const [apartmentInput, setApartmentInput] = useState(address.address2)
  const [cityInput, setCityInput] = useState(address.city)
  const [countryInput, setCountryInput] = useState(address.country)
  const [zipInput, setZipInput] = useState(address.zip)
  const [phoneInput, setPhoneInput] = useState(address.phone)
  const [countriesAll, setCountriesAll] = useState([])
  const [checkDefaultAddress, setCheckDefaultAddress] = useState(isDefault)

  const { customerAccessToken } = useContext(StoreContext)

  const getLocations = () => {
    return axios('https://restcountries.eu/rest/v2/all')
  }

  useEffect(() => {
    getLocations().then(({ data }) => {
      setCountriesAll(data)
    })
  }, [])

  return (
    <Fragment>
      <button type={'button'} onClick={() => setEditAdressForm(true)}>
        Edit Address
      </button>

      <Modal
        className={'account-modal'}
        show={editAddressForm}
        onHide={() => setEditAdressForm(false)}
        centered={true}
      >
        <Modal.Body>
          <button
            type={'button'}
            className={'btn-dismiss'}
            onClick={() => setEditAdressForm(false)}
          >
            <GSIcon icon={'gs-x'} />
          </button>
          {editAddressForm && (
            <div className="address-form">
              <Mutation mutation={CUSTOMER_EDIT_ADDRESS}>
                {customerAddressUpdate => {
                  return (
                    <Mutation mutation={CUSTOMER_EDIT_DEFAULT_ADDRESS}>
                      {customerDefaultAddressUpdate => {
                        return (
                          <form className={'modal-form'}>
                            <div className="form-header">
                              <h4>Edit Address</h4>
                            </div>
                            <div className="field mt-auto">
                              <input
                                type="text"
                                defaultValue={firstName + ' ' + lastName}
                                aria-label="Name"
                                placeholder="Name"
                                onChange={({ target: { value } }) => {
                                  const name = value.split(' ')
                                  setLastName(name.pop())
                                  setFirstName(name.join(' '))
                                }}
                              />
                            </div>
                            <div className="field mt-auto">
                              <input
                                value={companyInput}
                                type="text"
                                placeholder="Company"
                                aria-label="Company"
                                onChange={e => setCompanyInput(e.target.value)}
                              />
                            </div>
                            <div className="field mt-auto">
                              <input
                                type="text"
                                defaultValue={addressInput}
                                aria-label="Address1"
                                placeholder="Address"
                                onChange={e => setAddressInput(e.target.value)}
                              />
                            </div>
                            <div className="field mt-auto">
                              <input
                                type="text"
                                defaultValue={apartmentInput}
                                name="address"
                                aria-label="Address2"
                                placeholder="Apartment, suite, etc."
                                onChange={e =>
                                  setApartmentInput(e.target.value)
                                }
                              />
                            </div>
                            <div className="field mt-auto">
                              <input
                                type="text"
                                defaultValue={cityInput}
                                name="city"
                                aria-label="City"
                                placeholder="City"
                                onChange={e => setCityInput(e.target.value)}
                              />
                            </div>
                            <div className={'d-flex'}>
                              <div className="field mr-2">
                                <select
                                  value={countryInput}
                                  onChange={({ target: { value } }) =>
                                    setCountryInput(value)
                                  }
                                  onBlur={() =>
                                    false && console.log('Country Changed')
                                  }
                                >
                                  {countriesAll.map((country, index) => (
                                    <option value={country.name} key={index}>
                                      {country.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="field">
                                <input
                                  type="text"
                                  defaultValue={zipInput}
                                  aria-label="Zip"
                                  placeholder="Zip"
                                  onChange={e => setZipInput(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="field mt-auto">
                              <input
                                type="tel"
                                defaultValue={phoneInput}
                                name="phone"
                                aria-label="Mobile"
                                placeholder="Mobile"
                                onChange={e => setPhoneInput(e.target.value)}
                              />
                            </div>
                            <div className="d-flex">
                              <input
                                className="mr-2 checkbox"
                                type="checkbox"
                                aria-label="Set as default address"
                                onChange={() =>
                                  setCheckDefaultAddress(!checkDefaultAddress)
                                }
                                defaultChecked={checkDefaultAddress}
                              />
                              <label
                                className="checkbox"
                                htmlFor="checkboxDefaultAddress"
                              >
                                Set as default address
                              </label>
                            </div>
                            <div className="field d-flex justify-content-between mt-auto">
                              <button
                                type={'button'}
                                className={'btn-back dismiss flex-shrink-1'}
                                onClick={() => setEditAdressForm(false)}
                              >
                                CANCEL
                              </button>
                              <button
                                type={'submit'}
                                className={'btn-submit flex-grow-1'}
                                onClick={() => {
                                  customerAddressUpdate({
                                    variables: {
                                      customerAccessToken:
                                        customerAccessToken.accessToken,
                                      id: address.id,
                                      address: {
                                        address1: addressInput,
                                        city: cityInput,
                                        company: companyInput,
                                        country: countryInput,
                                        firstName: firstName,
                                        lastName: lastName,
                                        phone: phoneInput,
                                        zip: zipInput,
                                      },
                                    },
                                  })
                                  checkDefaultAddress &&
                                    customerDefaultAddressUpdate({
                                      variables: {
                                        customerAccessToken:
                                          customerAccessToken.accessToken,
                                        addressId: address.id,
                                      },
                                    }).then(result => alert(result))
                                }}
                              >
                                Add Address
                              </button>
                            </div>
                          </form>
                        )
                      }}
                    </Mutation>
                  )
                }}
              </Mutation>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default EditAddressForm
