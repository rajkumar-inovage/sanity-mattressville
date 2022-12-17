import React, { useEffect } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import ReactHtmlParser from 'html-react-parser'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

import Brand from '~/components/Brand'
import isBrowser from '~/components/functions/is-browser'
import affirmImage from '~/images/affirm.png'

const ProductContentDesktop = ({ product, data: { logo, couponImage } }) => {
  useEffect(() => {
    if (isBrowser) {
      const contentTables = document.querySelectorAll('.tab-content table')
      contentTables &&
        contentTables.forEach(tableEle => {
          tableEle.classList.add('table', 'table-striped', 'table-bordered')
        })
      document
        .querySelectorAll('.tab-container.features figure.image_resized')
        .forEach(element => {
          element.style.margin = 'auto 0'
          element.style.width = '0.8em'
        })
      document
        .querySelectorAll('.tab-container.features figure image')
        .forEach(element => {
          element.alt = element.alt ? element.alt : 'features'
        })
    }
  })

  return (
    <div className={'product-content'}>
      <Tab.Container id={'product-content'} defaultActiveKey={'description'}>
        <Nav variant={'pills'} className={'nav-justified'}>
          <Nav.Item>
            <Nav.Link eventKey={'description'}>DESCRIPTION</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={'information'}>INFORMATION</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={'features'}>FEATURES</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={'reviews'}>REVIEWS</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey={'description'}>
            <div className={'tab-container'}>
              <div className={'d-flex'}>
                <div className={'flex-grow-1'}>
                  <h6 className={'d-none'}>
                    <strong>
                      **Delivery times vary, it can take 3-10 days to receive
                      your product. After your purchase is made, you will be
                      contacted by customer service to schedule your delivery.**
                    </strong>
                  </h6>
                  <div className={'d-flex mb-3'}>
                    <div className={'flex-shrink-1 my-auto mr-2'}>
                      <Brand productVendor={product.vendor} />
                    </div>
                    <h4 className={'my-auto'}>{product.title}</h4>
                  </div>
                  {product.descriptionHtml &&
                    ReactHtmlParser(
                      product.descriptionHtml.replace(/<img .*?>/g, '')
                    )}
                  <div className={'pay-later mt-3'}>
                    <p style={{ fontWeight: '600' }}>
                    Buy now pay over time! Financing available via Affirm.
                      <br />
                      Learn more on{' '}
                      <a
                        target={'blank'}
                        href={`https://helpcenter.affirm.com/s/`}
                        rel={'noopener noreferrer'}
                      >
                        <img
                          alt={'Affirm'}
                          src={affirmImage}
                          loading={'lazy'}
                          height={23}
                        />
                      </a>
                    </p>
                  </div>
                </div>
                <div className={'flex-shrink-1'}>
                  <div className={'logo'}>
                    <GatsbyImage
                      image={logo.childImageSharp.gatsbyImageData}
                      alt={'mattressVilleLogo'}
                    />
                  </div>
                  <div className={'coupon-logo'}>
                    <Link className={'coupon-link-text'} to={'/coupons/'}>
                      Don't Forget To Check
                    </Link>
                    <Link className={'coupon-link-text'} to={'/coupons/'}>
                      Coupons & Deals
                    </Link>
                    <Link className={'coupon-link'} to={'/coupons/'}>
                      <GatsbyImage
                        image={couponImage.childImageSharp.gatsbyImageData}
                        alt={'Coupon Image'}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey={'information'}>
            <div className={'tab-container'}>
              {product.info_tab &&
                ReactHtmlParser(
                  product.info_tab.value
                    .replace(/\n|\t/g, '')
                    .replace('> <', '><')
                )}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey={'features'}>
            <div className={'tab-container features'}>
              {product.features_tab &&
                ReactHtmlParser(product.features_tab.value)}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey={'reviews'}>
            <div className={'tab-container'}>
              {/* <ProductReviews product={product} /> */}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}

export default ProductContentDesktop
