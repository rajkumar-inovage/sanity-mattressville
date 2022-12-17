const { createRemoteFileNode } = require('gatsby-source-filesystem')
const path = require(`path`)

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions
  createResolvers({
    // ShopifyStoreAdmin_Image: {
    //   localImage: {
    //     type: `File`,
    //     resolve(source) {
    //       return createRemoteFileNode({
    //         url: source.url,
    //         store,
    //         cache,
    //         createNode,
    //         createNodeId,
    //         reporter,
    //       })
    //     },
    //   },
    // },
    ShopifyStore_Image: {
      localImage: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url: source.url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allShopifyProduct {
        productCount: totalCount
      }
      store {
        blogs(first: 250) {
          edges {
            node {
              title
              handle
              articles(first: 250) {
                edges {
                  node {
                    title
                    handle
                    publishedAt
                  }
                }
              }
            }
          }
        }

        collections(first: 250) {
          edges {
            node {
              title
              handle
              id
              image {
                altText
                url(
                  transform: {
                    maxHeight: 627
                    maxWidth: 1200
                    crop: CENTER
                    scale: 1
                  }
                )
              }
              updatedAt
            }
          }
        }

        pages(first: 250) {
          edges {
            node {
              title
              handle
              updatedAt
            }
          }
        }

        products(first: 250) {
          edges {
            node {
              title
              handle
              tags
              updatedAt
            }
          }
        }
      }
    }
  `).then(
    ({
      data: {
        allShopifyProduct: { productCount },
        store: {
          blogs: { edges: blogs },
          products: { edges: products },
          collections: { edges: collections },
          pages: { edges: pages },
        },
      },
    }) => {
      const perPageLimit = 9
      Array.from(
        {
          length: Math.ceil(productCount / perPageLimit),
        },
        (_, i) => i + 1
      ).forEach(pageNo => {
        createPage({
          path: `/products/all/page/${pageNo}/`,
          component: path.resolve(`./src/templates/allProducts.jsx`),
          context: {
            ogPath: `/products/all/page/${pageNo}/`,
            pageNo,
            limit: perPageLimit,
            title: `All Product Page ${pageNo}`,
            skip: 9 * (pageNo - 1),
          },
        })
      })

      collections.forEach(({ node }) => {
        const { handle, id, image, updatedAt, title } = node
        if (handle.includes('accessories')) {
          createPage({
            path: `/accessories/${handle.replace('accessories-', '')}/`,
            component: path.resolve(`./src/templates/collectionPage.jsx`),
            context: {
              ogPath: `/accessories/${handle.replace('accessories-', '')}/`,
              handle,
              id,
              image,
              title,
              lastModifiedDate: updatedAt,
            },
          })
        } else if (handle.includes('brand')) {
          createPage({
            path: `/brands/${handle.replace('brand-', '')}/`,
            component: path.resolve(`./src/templates/collectionPage.jsx`),
            context: {
              ogPath: `/brands/${handle.replace('brand-', '')}/`,
              handle,
              id,
              image,
              title,
              lastModifiedDate: updatedAt,
            },
          })
        } else {
          createPage({
            path: `/all-mattresses/${handle}/`,
            component: path.resolve(`./src/templates/collectionPage.jsx`),
            context: {
              ogPath: `/all-mattresses/${handle}/`,
              handle,
              id,
              image,
              title,
              lastModifiedDate: updatedAt,
            },
          })
        }
      })

      products.forEach(({ node: { title, handle, tags, updatedAt } }) => {
        createPage({
          path: `/products/${handle}/`,
          component: path.resolve(`./src/templates/productPage.jsx`),
          context: {
            title,
            handle,
            tags,
            lastModifiedDate: updatedAt,
          },
        })
      })

      blogs.forEach(
        ({
          node: {
            title: blogTitle,
            handle: blogHandle,
            articles: { edges: articles },
          },
        }) => {
          const ignoreBlogHandles = [
            'coupons',
            'home-slider',
            'extended-banners',
          ]
          if (!ignoreBlogHandles.includes(blogHandle)) {
            if (blogHandle.includes('flyer')) {
              articles.length > 0 &&
                articles.forEach(
                  ({ node: { title, handle: articleHandle }, publishedAt }) => {
                    createPage({
                      path: `/${blogHandle}/${articleHandle}/`,
                      component: path.resolve(`./src/templates/flyersPage.jsx`),
                      context: {
                        title,
                        ogPath: `/${blogHandle}/${articleHandle}/`,
                        blogHandle: `handle:${blogHandle}`,
                        articleHandle,
                        lastModifiedDate: publishedAt,
                      },
                    })
                  }
                )
            } else {
              createPage({
                path: `/category/${blogHandle}/`,
                component: path.resolve(`./src/templates/blogPage.jsx`),
                context: {
                  title: blogTitle,
                  blogHandle,
                },
              })

              articles.length > 0 &&
                articles.forEach(
                  ({ node: { title, handle: articleHandle } }) => {
                    createPage({
                      path: `/blog/${articleHandle}/`,
                      component: path.resolve(
                        `./src/templates/articlePage.jsx`
                      ),
                      context: {
                        title,
                        blogHandle: `handle:${blogHandle}`,
                        articleHandle,
                      },
                    })
                  }
                )
            }
          }
        }
      )

      pages.forEach(({ node }) => {
        const { title, handle, updatedAt } = node
        createPage({
          path: `/${handle}/`,
          component: path.resolve(`./src/templates/shopifyPage.jsx`),
          context: {
            title,
            ogPath: `/${handle}/`,
            handle,
            lastModifiedDate: updatedAt,
          },
        })
      })
    }
  )
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })

  if (stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    })
  }
}
