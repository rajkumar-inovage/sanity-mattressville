import React, { useState, useContext } from 'react'
import * as CheckPhone from 'phone'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import StoreContext from '~/context/StoreContext'
import ConnexionLayout from '~/components/customer/ConnexionLayout'

const CUSTOMER_LOGIN = gql`
  mutation customerCreate(
    $createInput: CustomerCreateInput!
    $loginInput: CustomerAccessTokenCreateInput!
  ) {
    customerCreate(input: $createInput) {
      customer {
        id
      }
      customerUserErrors {
        message
      }
    }
    customerAccessTokenCreate(input: $loginInput) {
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

const RegisterForm = ({ doDismiss, doDismiss: onSuccess }) => {
  const { setValue } = useContext(StoreContext),
    [messageInfo, setMessageInfo] = useState(null),
    [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [email, setEmail] = useState(''),
    [phone, setPhone] = useState(''),
    [password, setPassword] = useState(''),
    handleCustomerAccessToken = value => {
      setValue(value)
    }

  return (
    <section className="register">
      <Mutation mutation={CUSTOMER_LOGIN}>
        {customerLogin => {
          return (
            <form
              onSubmit={event => {
                event.preventDefault()
                if (email === '' || password === '') {
                  alert('Email and password are required')
                  return false
                }
                customerLogin({
                  variables: {
                    createInput: {
                      firstName: firstName,
                      lastName: lastName,
                      phone: phone,
                      email: email,
                      password: password,
                    },
                    loginInput: {
                      email: email,
                      password: password,
                    },
                  },
                })
                  .then(result => {
                    if (result.data.customerCreate.customer !== null) {
                      handleCustomerAccessToken(
                        result.data.customerAccessTokenCreate
                          .customerAccessToken
                      )
                      onSuccess()
                    } else {
                      setMessageInfo(
                        result.data.customerCreate.customerUserErrors
                          .map(({ message }) => {
                            return message
                          })
                          .join(', ')
                      )
                    }
                  })
                  .catch(err => {
                    setMessageInfo(
                      err.message.includes('Limit exceed')
                        ? 'User register limit exceeded, Please try after some time.'
                        : err.message
                    )
                  })
              }}
            >
              {messageInfo && (
                <div className={'notification is-success'}>{messageInfo}</div>
              )}
              <div className="field">
                <input
                  type="text"
                  name="name"
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
                  name="phone"
                  aria-label="Mobile"
                  placeholder="Mobile"
                  required={true}
                  onChange={({ target: { value } }) =>
                    setPhone(CheckPhone(value, 'CAN')[0])
                  }
                />
              </div>
              <div className="field">
                <input
                  type="email"
                  name="email"
                  aria-label="Email"
                  placeholder="Email"
                  required={true}
                  onChange={({ target: { value } }) => setEmail(value)}
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  aria-label="Password"
                  placeholder="Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required={true}
                  onChange={({ target: { value } }) => setPassword(value)}
                />
              </div>
              <div className="field d-flex justify-content-between">
                <button
                  className={'btn-back dismiss flex-shrink-1'}
                  onClick={doDismiss}
                >
                  CANCEL
                </button>
                <button type={'submit'} className={'btn-submit flex-grow-1'}>
                  SAVE & CONTINUE
                </button>
              </div>
            </form>
          )
        }}
      </Mutation>
    </section>
  )
}

const Register = ({ doDismiss }) => {
  return (
    <ConnexionLayout>
      <RegisterForm doDismiss={doDismiss} />
    </ConnexionLayout>
  )
}

export default Register
