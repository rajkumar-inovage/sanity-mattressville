import React, { useState, useContext, Fragment } from 'react'
import { navigate } from 'gatsby'
import { Alert, Container, Row, Col } from 'react-bootstrap'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

import Seo from '~/components/seo'
import StoreContext from '~/context/StoreContext'
import ConnexionLayout from '~/components/customer/ConnexionLayout'
import Register from '~/components/header/register'

const CUSTOMER_LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
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

const CHECKOUT_CUSTOMER_ASSOCIATE = gql`
  mutation checkoutCustomerAssociateV2(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        id
      }
      customer {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

const CUSTOMER_PASSWORD_RESET = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const LoginForm = () => {
  const {
      store: { checkout },
      setValue,
    } = useContext(StoreContext),
    [passwordForgot, setPasswordForgot] = useState(false),
    [email, setEmail] = useState(''),
    [emailReset, setEmailReset] = useState(''),
    [messageInfo, setMessageInfo] = useState(''),
    [password, setPassword] = useState(null),
    [customerAssociate] = useMutation(CHECKOUT_CUSTOMER_ASSOCIATE, {
      onCompleted: data => {
        if (data) {
          //   onSuccess()yy
          navigate(`/account/`)
        }
      },
    }),
    [customerLogin] = useMutation(CUSTOMER_LOGIN, {
      onCompleted: data => {
        if (data) {
          if (data.customerAccessTokenCreate.customerAccessToken !== null) {
            setValue(data.customerAccessTokenCreate.customerAccessToken)
            // Associate checkoutId with the the Logged In Customer
            customerAssociate({
              variables: {
                checkoutId: checkout.id,
                customerAccessToken:
                  data.customerAccessTokenCreate.customerAccessToken
                    .accessToken,
              },
            })
          } else {
            switch (
              data.customerAccessTokenCreate.customerUserErrors.pop().code
            ) {
              case 'UNIDENTIFIED_CUSTOMER':
                setMessageInfo('Email or Password is incorrect')
                break
              default:
            }
          }
        }
      },
    }),
    [customerRecover] = useMutation(CUSTOMER_PASSWORD_RESET, {
      onCompleted: data => {
        if (data) {
          setMessageInfo(
            "We've sent you an email with a link to update your password."
          )
          setPasswordForgot(false)
        }
      },
    })

  return (
    <Fragment>
      {passwordForgot ? (
        <section className="forgot-password">
          <Alert variant="info">
            <Alert.Heading>RESET YOUR PASSWORD</Alert.Heading>
            <p>We will send you an email to reset your password.</p>
          </Alert>
          <div className="field">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              aria-label="Email"
              onChange={e => setEmailReset(e.target.value)}
            />
          </div>
          <div className="field d-flex justify-content-between">
            <button
              className="btn-submit"
              onClick={() => {
                customerRecover({
                  variables: {
                    email: emailReset,
                  },
                })
              }}
            >
              SUBMIT
            </button>
            <button
              className="btn-back"
              onClick={e => setPasswordForgot(!passwordForgot)}
            >
              <span>Cancel</span>
            </button>
          </div>
        </section>
      ) : (
        <form
          className={'login'}
          onSubmit={event => {
            event.preventDefault()
            customerLogin({
              variables: {
                input: {
                  email: email,
                  password: password,
                },
              },
            })
          }}
        >
          {messageInfo && (
            <div className={'notification is-success'}>{messageInfo}</div>
          )}
          <div className={'field'}>
            <input
              type={'email'}
              aria-label={'Email'}
              placeholder={'Email'}
              required={true}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={'field'}>
            <input
              type={'password'}
              aria-label={'Password'}
              placeholder={'Password'}
              pattern={'(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'}
              title={
                'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
              }
              required={true}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className={'field'}>
            <button type={'submit'} className={'btn-submit'}>
              SUBMIT
            </button>
          </div>
          <div className={'field'}>
            <button
              className={'btn-forgot'}
              onClick={e => setPasswordForgot(!passwordForgot)}
            >
              Forgot your password?
            </button>
          </div>
        </form>
      )}
    </Fragment>
  )
}

const Login = () => {
  return (
    <Fragment>
      <Seo
        title={'Account Login'}
        description={
          'Access to the customers area to check your order status, track your orders shipping and manage your addresses.'
        }
        titleAfter={true}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Account Login',
          description:
            'Access to the customers area to check your order status, track your orders shipping and manage your addresses.',
          publisher: {
            '@type': 'Organization',
            name: 'Mattressville',
          },
        }}
      />
      <section className={`py-5`}>
        <ConnexionLayout>
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <div className={`login-box`}>
                  <div className={`login-title`}>
                    <h1>Login</h1>
                  </div>
                  <LoginForm />
                </div>
              </Col>
              <Col
                xs={12}
                md={6}
                className={`square border-start mt-5 mt-md-0`}
              >
                <div className={`login-box`}>
                  <div className={`login-title`}>
                    <h2>Register</h2>
                  </div>
                  <Register />
                </div>
              </Col>
            </Row>
          </Container>
        </ConnexionLayout>
      </section>
    </Fragment>
  )
}
export default Login
