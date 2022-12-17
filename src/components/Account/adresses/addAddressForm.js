import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import axios from 'axios'

import StoreContext from '~/context/StoreContext'
import GSIcon from '~/components/gs-icon'

const CUSTOMER_CREATE_ADDRESS = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
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

const AddAddressForm = () => {
  const [addAdressForm, setAddAdressForm] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyInput, setCompanyInput] = useState('')
  const [addressInput, setAddressInput] = useState('')
  const [apartmentInput, setApartmentInput] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [countryInput, setCountryInput] = useState('')
  const [zipInput, setZipInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [countriesAll, setCountriesAll] = useState([])
  const [checkDefaultAddress, setCheckDefaultAddress] = useState(false)

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
      <button type={'button'} onClick={() => setAddAdressForm(true)}>
        Add New
      </button>

      <Modal
        className={'account-modal'}
        show={addAdressForm}
        onHide={() => setAddAdressForm(false)}
        centered={true}
      >
        <Modal.Body>
          <button
            type={'button'}
            className={'btn-dismiss'}
            onClick={() => setAddAdressForm(false)}
          >
            <GSIcon icon={'gs-x'} />
          </button>
          {addAdressForm && (
            <div className={'columns is-centered'}>
              <div className={'column is-6 has-text-left'}>
                <Mutation mutation={CUSTOMER_CREATE_ADDRESS}>
                  {customerAddressCreate => {
                    return (
                      <form className={'modal-form'}>
                        <div className="form-header">
                          <h4>Add A New Address</h4>
                        </div>
                        <div className="field mt-auto">
                          <input
                            type="text"
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
                            type="text"
                            placeholder="Company"
                            aria-label="Company"
                            onChange={e => setCompanyInput(e.target.value)}
                          />
                        </div>
                        <div className="field mt-auto">
                          <input
                            type="text"
                            aria-label="Address1"
                            placeholder="Address"
                            onChange={e => setAddressInput(e.target.value)}
                          />
                        </div>
                        <div className="field mt-auto">
                          <input
                            type="text"
                            name="address"
                            defaultValue={apartmentInput}
                            aria-label="Address2"
                            placeholder="Apartment, suite, etc."
                            onChange={e => setApartmentInput(e.target.value)}
                          />
                        </div>
                        <div className="field mt-auto">
                          <input
                            type="text"
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
                              aria-label="Zip"
                              placeholder="Zip"
                              onChange={e => setZipInput(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="field mt-auto">
                          <input
                            type="tel"
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
                            onClick={() => setAddAdressForm(false)}
                          >
                            CANCEL
                          </button>
                          <button
                            type={'submit'}
                            className={'btn-submit flex-grow-1'}
                            onClick={() => {
                              customerAddressCreate({
                                variables: {
                                  customerAccessToken:
                                    customerAccessToken.accessToken,
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
                              }).then(result => {
                                setAddAdressForm(!addAdressForm)
                                // alert(result)
                                // navigate('/account/')
                              })
                            }}
                          >
                            Add Address
                          </button>
                        </div>
                      </form>
                    )
                  }}
                </Mutation>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default AddAddressForm
