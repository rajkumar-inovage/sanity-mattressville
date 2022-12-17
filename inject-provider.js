import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
//import './src/scss/mville.scss'

const Injection = ({ element }) => {
  const shopName = process.env.SHOP_NAME
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN
  const apiVersion = '2022-04'
  const apiPath = apiVersion
    ? `api/${apiVersion}/graphql.json`
    : 'api/graphql.json'

  const httpLink = createHttpLink({
    uri: `https://${shopName}.myshopify.com/${apiPath}`,
  })

  const middlewareLink = setContext(() => ({
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
  }))

  const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}

export default Injection
