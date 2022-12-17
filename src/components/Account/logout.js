import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { Link, navigate } from 'gatsby'
import { Mutation, useMutation } from 'react-apollo'
import StoreContext from '~/context/StoreContext'

const CUSTOMER_LOGOUT = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`
const CUSTOMER_DISASSOCIATE = gql`
  mutation checkoutCustomerDisassociateV2($checkoutId: ID!) {
    checkoutCustomerDisassociateV2(checkoutId: $checkoutId) {
      checkout {
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

const Logout = () => {
  const {
      store: { checkout },
      setValue,
      customerAccessToken,
    } = useContext(StoreContext),
    [customerDisassociate] = useMutation(CUSTOMER_DISASSOCIATE, {
      onCompleted: data => {
        if (data) {
          setValue({
            customerAccessToken: '',
          })
          navigate('/')
        }
      },
    })

  return customerAccessToken !== null ? (
    <Mutation
      mutation={CUSTOMER_LOGOUT}
      onCompleted={data => {
        if (data.customerAccessTokenDelete.userErrors.length) return
      }}
    >
      {customerLogout => {
        return (
          <Link
            to={`/`}
            onClick={e => {
              e.preventDefault()
              customerLogout({
                variables: {
                  customerAccessToken: customerAccessToken.accessToken,
                },
              })
              customerDisassociate({
                variables: {
                  checkoutId: checkout.id,
                },
              })
            }}
          >
            Log out
          </Link>
        )
      }}
    </Mutation>
  ) : null
}

export default Logout
