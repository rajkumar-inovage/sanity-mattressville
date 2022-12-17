import React, { Fragment, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEqual, find } from 'lodash'
import ReactHtmlParser from 'html-react-parser'

import GSIcon from '~/components/gs-icon'
import capitalize from '~/components/functions/capitalize'
import getQueenVariant from '~/components/functions/get-queen-variant'
import StoreContext from '~/context/StoreContext'
import ArrRight from '~/components/icons/arr-right'
import EasyPayment from '~/components/icons/easypayment'
import ProductIntro from './product-intro'
import Gallery from './gallery'
import GetScore from '~/components/functions/get-score'
import GetPrice from '~/components/functions/get-price'
import affirmImage from '~/images/affirm.png'

const ProductFormTablet = ({ product }) => {
  const {
      options,
      images,
      variants: { edges: variants },
      collections: { edges: categories },
      variants: {
        edges: [initialVariant],
      },
    } = product,
    queenVariant = getQueenVariant(product.variants),
    defaultVariant = queenVariant ? queenVariant.node : initialVariant.node,
    [variant, setVariant] = useState({ ...defaultVariant }),
    { addVariantToCart, addVariantToCartAndBuyNow } = useContext(StoreContext),
    [quantity, setQuantity] = useState(1),
    [payBrightModal, togglePayBrightModal] = useState(false),
    dropQuantity = () => {
      quantity > 1 && setQuantity(quantity - 1)
    },
    raiseQuantity = () => {
      setQuantity(quantity + 1)
    },
    scrollTop = () => {
      document.documentElement.style.scrollBehavior = 'smooth'
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      setTimeout(() => {
        document.documentElement.removeAttribute('style')
      }, 500)
    },
    handleAddToCart = () => {
      addVariantToCart(variant.id, quantity).then(() => {
        scrollTop()
        document
          .querySelector('.mobile-bottom-right .mini-cart .dropdown-toggle')
          .click()
      })
    },
    handleBuyNow = () => {
      addVariantToCartAndBuyNow(variant.id, quantity)
    },
    handleOptionChange = (optionI, { target }) => {
      const { value } = target,
        currentOptions = [...variant.selectedOptions],
        url = new URL(window.location)

      currentOptions[optionI] = {
        ...currentOptions[optionI],
        value,
      }

      const newVariant = find(variants, ({ node: { selectedOptions } }) => {
        return isEqual(currentOptions, selectedOptions)
      })

      setVariant(newVariant.node)
      newVariant.node.selectedOptions.forEach(({ name, value }) => {
        url.searchParams.set(name.toLowerCase(), value)
      })
      window.history.replaceState({}, '', url)
    }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      window.addEventListener('scroll', () => {
        const relatedProducts = document.querySelector('.related-products'),
          btnAdd2Cart = document.querySelector('.btn-add-to-cart')
        if (
          window.scrollY >=
          relatedProducts.offsetTop - relatedProducts.offsetHeight - 140
        ) {
          btnAdd2Cart.classList.add('unfixed')
        } else {
          btnAdd2Cart.classList.remove('unfixed')
        }
      })
      if (params.get('size')) {
        const sizeParam = decodeURIComponent(params.get('size'))
        if (params.get('option')) {
          const optionParam = decodeURIComponent(params.get('option'))
          const newVar = find(variants, ({ node: { selectedOptions } }) => {
            return isEqual(
              [
                {
                  name: 'Size',
                  value: sizeParam.split('-').join(' ').toUpperCase(),
                },
                {
                  name: 'Options',
                  value: capitalize(
                    optionParam.includes('-')
                      ? optionParam.split('-').join(' ')
                      : optionParam
                  ),
                },
              ],
              selectedOptions
            )
          })
          newVar && setVariant(newVar.node)
        } else {
          const newVar = find(variants, ({ node: { selectedOptions } }) => {
            return find(selectedOptions, ({ name, value }) => {
              return (
                name === 'Size' &&
                value.toLowerCase() ===
                  sizeParam.split('-').join(' ').toLowerCase()
              )
            })
          })
          newVar && setVariant(newVar.node)
        }
      }
    }
  }, [variants])

  // ? just to get rid of warnings
  false && handleBuyNow()

  return (
    <div className={'mobile-view-title'}>
      <div className={'product-form'}>
        <div className={'d-block'}>
          <div className={'top'}>
            <ProductIntro
              vendor={product.vendor}
              title={product.title}
              card_features={
                product.card_features && product.card_features.value
              }
            />
            <div className={'paybright-container'}>
              <button
                className={'more-info'}
                onClick={() => togglePayBrightModal(true)}
              >
                <img
                  className={'logo'}
                  alt={'Affirm'}
                  src={affirmImage}
                  loading={'lazy'}
                  width={71}
                />
                <GSIcon icon={'gs-info'} extraclassName={'ml-2'} />
              </button>
              <p className={'desc'}>
                {`Pay in 4 interest-free payments of ${GetPrice(
                  variant.priceV2.amount / 4
                )}`}
              </p>
            </div>
          </div>
          <div className={'bottom'}>
            <div className={'prices'}>
              <div className={'price-box d-flex'}>
                <div className={'our-price'}>
                  <h4 className={'mb-0'}>Our Price</h4>
                  <h3 className={'our-price mb-0'}>
                    {GetPrice(variant.priceV2.amount)}
                  </h3>
                </div>
                <div className={'retailprice'}>
                  {variant.compareAtPriceV2 && (
                    <Fragment>
                      <h4 className={'mb-0'}>Compare At</h4>
                      <h3 className={'retail-price mb-0'}>
                        {GetPrice(variant.compareAtPriceV2.amount)}
                      </h3>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={'peoduct-image'}>
            <Gallery images={images.edges} />
          </div>
        </div>
        <button
          type={'button'}
          onClick={handleAddToCart}
          className={'btn-add-to-cart'}
        >
          <span>Add To Cart</span>
          <ArrRight
            className={'my-auto'}
            width={26}
            height={13}
            stroke={'#ffffff'}
          />
        </button>
        <div className={'product-data'}>
          <div className={'additional-data'}>
            <ul>
              <li>Posturetech Support Coil</li>
              <li>UniCased™ Edge Support Technology</li>
              <li>HD StayTrue Foam resists sagging</li>
            </ul>
          </div>
          <div className={'form-wrapper'}>
            <div className={'variant-types'}>
              <div className={'size-drop-down'}>
                {options.map(({ id, name, values }, i) => (
                  <select
                    key={i}
                    className={'select-size'}
                    name={id.toString()}
                    id={id.toString()}
                    onChange={event => handleOptionChange(i, event)}
                    onBlur={() => false && console.log('changed')}
                    value={
                      variant.selectedOptions.filter(option => {
                        return option.name === name
                      })[0].value
                    }
                  >
                    <option value={null}>{`Select: ${name}`}</option>
                    {values.map((value, j) => (
                      <option key={j} value={value}>
                        {ReactHtmlParser(value)}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          </div>
          <div className={'flex-grow-1 my-auto'}>
            <div className={'quantity-label'}>QUANTITY</div>
            <div className={'d-flex'}>
              <div className={'flex-shrink-1 my-auto'}>
                <div className={'quantity-selector'}>
                  <button
                    type={'button'}
                    className={'btn-quantity minus'}
                    aria-label={'Quantity Minus'}
                    onClick={dropQuantity}
                  />
                  <span className={'quantity-value'}>{quantity}</span>
                  <button
                    type={'button'}
                    className={'btn-quantity plus'}
                    aria-label={'Quantity Plus'}
                    onClick={raiseQuantity}
                  />
                </div>
              </div>
              <div className={'flex-grow-1 my-auto'}>
                <p className={'available-quantity'}>
                  {variant.quantityAvailable !== 0 && `In stock.`}
                </p>
              </div>
            </div>
          </div>
          <div className={'meter'}>
            <div className={'flex-grow-1 my-auto'}>
              {product.productType === 'Mattresses' && (
                <div className={`firm-meter level-${GetScore(product.tags)}`}>
                  <h6 className={'d-flex justify-content-between'}>
                    <span className={'d-block'}>Soft</span>
                    <span className={'d-block'}>Firm</span>
                  </h6>
                  <div className={'d-flex'}>
                    {Array(4)
                      .fill()
                      .map((_, i) => {
                        return (
                          <div key={i} className={'meter-block flex-fill'} />
                        )
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={'product-sku'}>
          <strong>{'SKU: '}</strong>
          <span>{variant.sku !== '' ? variant.sku : 'N/A'}</span>
        </div>
        <div className={'product-categories ml-0'}>
          <strong>{'Categories: '}</strong>
          {categories.map(({ node: { handle, title } }, index) => (
            <React.Fragment key={handle}>
              <strong>{title && `${ReactHtmlParser(title)}, `}</strong>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={`pay-bright-overlay ${payBrightModal ? 'show' : ''}`} />
      <div className={`pay-bright-modal ${payBrightModal ? 'open' : ''}`}>
        <div className={'header'}>
          <img
            alt={'Affirm'}
            className={'logo'}
            src={affirmImage}
            loading={'lazy'}
          />
          <button
            type={'button'}
            className={'modal-close'}
            onClick={() => togglePayBrightModal(false)}
          >
            {'×'}
          </button>
        </div>
        <div className={'body'}>
          <div className={'content-header'}>
            <h3 className={'heading'}>Buy Now, Pay Later</h3>
            <p className={'desc'}>in 4 bi-weekly, interest free payments</p>
            <p className={'subtext'}>
              Pay as little as <b>{GetPrice(variant.priceV2.amount / 4)}</b> in
              4 interest-free payments based on a purchase price of
              {GetPrice(variant.priceV2.amount)} at 0% APR.
            </p>
          </div>
          <div className={'modal-icons'}>
            <div className={'icon-content'}>
              <div className={'img-wrapper'}>
                <img className={'icon'} alt={'Close'} src={''} />
              </div>
              <div className={'content-wrapper'}>
                <p className={'sub-head'}>Instant Decision</p>
                <p className={'body-text'}>
                  Enter a few details to get a real-time decision.
                </p>
              </div>
            </div>
            <div className={'icon-content'}>
              <div className={'img-wrapper'}>
                <EasyPayment className={'icon'} />
              </div>
              <div className={'content-wrapper'}>
                <p className="sub-head">Easy Payments</p>
                <p className="body-text">
                  Automatically charged to your preferred method of payment
                </p>
              </div>
            </div>
          </div>
          <div className={'content-footer'}>
            <p className={'heading-text'}>Simply select Affirm at checkout</p>
            <p className={'disclaimer'}>
              *Estimated bi-weekly payment amount excludes taxes, shipping, and
              other fees. Some conditions apply and all transactions are subject
              to approval by Affirm. Visit{' '}
              <a
                href={'https://helpcenter.affirm.com/s/'}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                PayBright FAQ
              </a>
              {' for further information.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductFormTablet.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            altText: PropTypes.string,
            localImage: PropTypes.shape,
            url: PropTypes.string,
          }),
        })
      ),
    }),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          availableForSale: PropTypes.bool,
          id: PropTypes.string,
          price: PropTypes.string,
          title: PropTypes.string,
          shopifyId: PropTypes.string,
          selectedOptions: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              value: PropTypes.string,
            })
          ),
        })
      ),
    }),
  }),
}

export default ProductFormTablet
