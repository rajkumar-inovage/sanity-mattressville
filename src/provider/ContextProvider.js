import React, { useCallback, useEffect, useRef, useState } from 'react'
import fetch from 'isomorphic-fetch'
import Client from 'shopify-buy'
import { navigate } from 'gatsby'

import StoreContext from '~/context/StoreContext'

const ContextProvider = ({ children }) => {
  const { Provider } = StoreContext,
    client = Client.buildClient(
      {
        storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        domain: `${process.env.SHOP_NAME}.myshopify.com`,
      },
      fetch
    ),
    initialStoreState = {
      client,
      adding: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
      filteredType: 'all',
      filteredSort: 'featured',
      customerAccessToken: null,
    },
    isBrowser = typeof window !== 'undefined',
    [store, updateStore] = useState(initialStoreState),
    isRemoved = useRef(false),
    customerAccessToken =
      isBrowser && JSON.parse(localStorage.getItem('customerAccessToken')),
    addVariantToCart = async (variantId, quantity) => {
      if (variantId === '' || !quantity) {
        console.error('Both a size and quantity are required.')
        return
      }
      updateStore(prevState => {
        return { ...prevState, adding: true }
      })
      const { checkout, client } = store,
        checkoutId = checkout.id,
        lineItemsToUpdate = [{ variantId, quantity: parseInt(quantity, 10) }]
      return client.checkout
        .addLineItems(checkoutId, lineItemsToUpdate)
        .then(checkout => {
          updateStore(prevState => {
            return { ...prevState, checkout, adding: false }
          })
        })
    },
    addVariantToCartAndBuyNow = (variantId, quantity) => {
      updateStore(prevState => {
        return { ...prevState, adding: true }
      })
      const { checkout, client } = this.state.store,
        checkoutId = checkout.id,
        lineItemsToUpdate = [{ variantId, quantity: parseInt(quantity, 10) }]
      return client.checkout
        .addLineItems(checkoutId, lineItemsToUpdate)
        .then(checkout => {
          updateStore(prevState => {
            return { ...prevState, checkout, adding: false }
          })
          navigate(
            checkout.webUrl.replace(
              'mattress-ville.myshopify.com',
              'shop.mattressville.ca'
            )
          )
        })
    },
    applyCoupon = (client, checkoutID, discountCode) => {
      return client.checkout.addDiscount(checkoutID, discountCode).then(res => {
        updateStore(prevState => {
          return { ...prevState, checkout: res }
        })
      })
    },
    removeCoupon = (client, checkoutID) => {
      return client.checkout.removeDiscount(checkoutID).then(res => {
        updateStore(prevState => {
          return { ...prevState, checkout: res }
        })
      })
    },
    removeLineItem = (client, checkoutID, lineItemID) => {
      return client.checkout
        .removeLineItems(checkoutID, [lineItemID])
        .then(res => {
          updateStore(prevState => {
            return { ...prevState, checkout: res }
          })
        })
    },
    updateLineItem = (client, checkoutID, lineItemID, quantity) => {
      const lineItemsToUpdate = [
        { id: lineItemID, quantity: parseInt(quantity, 10) },
      ]
      return client.checkout
        .updateLineItems(checkoutID, lineItemsToUpdate)
        .then(res => {
          updateStore(prevState => {
            return { ...prevState, checkout: res }
          })
        })
    },
    updateNote = (checkoutID, note) => {
      return client.checkout
        .updateAttributes(checkoutID, { note })
        .then(res => {
          updateStore(prevState => {
            return { ...prevState, checkout: res }
          })
        })
    },
    updateShippingAddress = (checkoutID, shippingAddress) => {
      return client.checkout
        .updateShippingAddress(checkoutID, shippingAddress)
        .then(res => {
          updateStore(prevState => {
            return { ...prevState, checkout: res }
          })
        })
    },
    setValue = value => {
      isBrowser &&
        localStorage.setItem('customerAccessToken', JSON.stringify(value))
      updateStore(prevState => {
        return { ...prevState, customerAccessToken: value }
      })
    },
    initializeCheckout = useCallback(async () => {
      // Check for an existing cart.
      const existingCheckoutID = isBrowser
          ? localStorage.getItem('shopify_checkout_id')
          : null,
        setCheckoutInState = checkout => {
          isBrowser && localStorage.setItem('shopify_checkout_id', checkout.id)

          updateStore(prevState => {
            return { ...prevState, checkout }
          })
        },
        createNewCheckout = () => store.client.checkout.create(),
        fetchCheckout = id => store.client.checkout.fetch(id)
      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID)
          // Make sure this cart hasn’t already been purchased.
          if (!isRemoved.current && !checkout.completedAt) {
            setCheckoutInState(checkout)
            return
          }
        } catch (e) {
          isBrowser && localStorage.setItem('shopify_checkout_id', null)
        }
      }
      const newCheckout = await createNewCheckout()
      if (!isRemoved.current) {
        setCheckoutInState(newCheckout)
      }
    }, [store, isBrowser])

  useEffect(() => {
    initializeCheckout()
  }, [initializeCheckout])

  useEffect(() => () => {
    isRemoved.current = true
  })

  return (
    <Provider
      value={{
        store,
        customerAccessToken,
        addVariantToCart,
        addVariantToCartAndBuyNow,
        applyCoupon,
        removeCoupon,
        removeLineItem,
        updateLineItem,
        updateNote,
        updateShippingAddress,
        setValue,
      }}
    >
      {children}
    </Provider>
  )
}
export default ContextProvider
