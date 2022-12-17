import React, { useEffect, useContext, useState } from 'react'
import * as CheckPhone from 'phone'
import axios from 'axios'

import StoreContext from '~/context/StoreContext'

const ShippingForm = ({ doDismiss, doDismiss: onSuccess }) => {
  const {
      updateShippingAddress,
      store: { checkout },
    } = useContext(StoreContext),
    [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [phone, setPhone] = useState(''),
    [address1, setAddress1] = useState(''),
    [address2, setAddress2] = useState(''),
    [city, setCity] = useState(''),
    [province, setProvince] = useState(''),
    [country, setCountry] = useState('Canada'),
    [zip, setZip] = useState(''),
    [countriesAll, setCountriesAll] = useState([]),
    getLocations = () => {
      return axios('https://restcountries.eu/rest/v2/all')
    }

  useEffect(() => {
    getLocations().then(({ data }) => {
      setCountriesAll(data)
    })
  }, [])

  return (
    <section className="shipping">
      <div className="field">
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
      <div className="field">
        <input
          type="tel"
          aria-label="Mobile"
          placeholder="Mobile"
          onChange={({ target: { value } }) =>
            setPhone(CheckPhone(value, 'CAN')[0])
          }
        />
      </div>
      <div className="field">
        <input
          type="text"
          aria-label="Address1"
          placeholder="Address Line 1"
          onChange={({ target: { value } }) => setAddress1(value)}
        />
      </div>
      <div className="field">
        <input
          type="text"
          name="address"
          aria-label="Address2"
          placeholder="Address Line 2"
          onChange={({ target: { value } }) => setAddress2(value)}
        />
      </div>
      <div className={'d-flex'}>
        <div className="field mr-2">
          <input
            type="text"
            name="city"
            aria-label="City"
            placeholder="City"
            onChange={({ target: { value } }) => setCity(value)}
          />
        </div>
        <div className="field">
          <input
            type="text"
            aria-label="Province"
            placeholder="Province"
            onChange={({ target: { value } }) => setProvince(value)}
          />
        </div>
      </div>
      <div className={'d-flex'}>
        <div className="field mr-2">
          <select
            value={country}
            onChange={({ target: { value } }) => setCountry(value)}
            onBlur={() => false && console.log('Country Changed')}
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
            onChange={({ target: { value } }) => setZip(value)}
          />
        </div>
      </div>
      <div className="field d-flex justify-content-between">
        <button
          className={'btn-back dismiss flex-shrink-1'}
          onClick={doDismiss}
        >
          CANCEL
        </button>
        <button
          className={'btn-submit flex-grow-1'}
          onClick={() => {
            if (checkout) {
              updateShippingAddress(checkout.id, {
                company: null,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                address1: address1,
                address2: address2,
                city: city,
                province: province,
                country: country,
                zip: zip,
              })
              doDismiss()
            }
          }}
        >
          SAVE & CONTINUE
        </button>
      </div>
    </section>
  )
}

const Shipping = ({ doDismiss }) => {
  return <ShippingForm doDismiss={doDismiss} />
}

export default Shipping
