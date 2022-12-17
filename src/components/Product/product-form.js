import React, { Fragment, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEqual, find } from 'lodash'
import ReactHtmlParser from 'html-react-parser'

import GSIcon from '~/components/gs-icon'
import getQueenVariant from '~/components/functions/get-queen-variant'
import StoreContext from '~/context/StoreContext'
import ArrRight from '~/components/icons/arr-right'
import EasyPayment from '~/components/icons/easypayment'
import ProductIntro from './product-intro'
import GetPrice from '~/components/functions/get-price'
import affirmImage from '~/images/affirm.png'

const ProductForm = ({ product }) => {
  const {
      options,
      variants: { edges: variants },
      variants: {
        edges: [initialVariant],
      },
    } = product,
    [payBrightModal, togglePayBrightModal] = useState(false),
    queenVariant = getQueenVariant(product.variants),
    defaultVariant = queenVariant ? queenVariant.node : initialVariant.node,
    [variant, setVariant] = useState({ ...defaultVariant }),
    { addVariantToCart, addVariantToCartAndBuyNow } = useContext(StoreContext),
    [quantity, setQuantity] = useState(1),
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
          .querySelector('.top-right-menu .mini-cart .dropdown-toggle')
          .click()
      })
    },
    handleBuyNow = () => {
      addVariantToCartAndBuyNow(variant.id, quantity)
    },
    handleOptionChange = ({ target }, optionI) => {
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
      if (params.get('size')) {
        const sizeParam = decodeURIComponent(params.get('size'))
        if (params.get('options')) {
          const optionParam = decodeURIComponent(params.get('options'))
          const newVar = find(variants, ({ node: { selectedOptions } }) => {
            return isEqual(
              [
                {
                  name: 'Size',
                  value: sizeParam.split('-').join(' ').toUpperCase(),
                },
                {
                  name: 'Options',
                  value: optionParam.includes('-')
                    ? optionParam.split('-').join(' ')
                    : optionParam,
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
    <div className={'product-form'}>
      <div className={'d-flex'}>
        <div className={'flex-grow-1'}>
          <ProductIntro
            vendor={product.vendor}
            title={product.title}
            card_features={product.card_features && product.card_features.value}
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
        <div className={'flex-shrink-1'}>
          <div className={'prices'}>
            <h4>Our Price</h4>
            <h3 className={'our-price'}>{GetPrice(variant.priceV2.amount)}</h3>
            {variant.compareAtPriceV2 && (
              <Fragment>
                <h4>Compare At</h4>
                <h3 className={'retail-price'}>
                  {GetPrice(variant.compareAtPriceV2.amount)}
                </h3>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <div className={'form-wrapper'}>
        <div className={'variant-types'}>
          {options.map(({ id, name, values }, i) => (
            <div className={'type'} key={id.toString()}>
              <h4>
                <span>{`${name}: `}</span>
                <strong>
                  {ReactHtmlParser(variant.selectedOptions[i].value)}
                </strong>
              </h4>
              {values.map((value, j) => (
                <button
                  key={j}
                  type={'button'}
                  onClick={event => handleOptionChange(event, i)}
                  value={value}
                  className={`btn-option${
                    value === variant.selectedOptions[i].value ? ' active' : ''
                  }`}
                >
                  {ReactHtmlParser(value)}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className={'add-to-cart'}>
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
                {variant.availableForSale ? (
                  <p
                    className={'available-quantity'}
                    style={{ color: '#228B22' }}
                  >
                    IN STOCK
                  </p>
                ) : (
                  <p className={'available-quantity'}>NOT IN STOCK</p>
                )}
                {/* <p className={'available-quantity'}>
                  {variant.quantityAvailable !== 0 && `In stock.`}
                </p>  */}
              </div>
            </div>
          </div>
          <div className={'flex-shrink-1 my-auto'}>
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
          </div>
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
                <img className={'icon'} alt={'close'} src={''} />
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
            <p className={'heading-text'}>
              Simply select PayBright at checkout
            </p>
            <p className={'disclaimer'}>
              *Estimated bi-weekly payment amount excludes taxes, shipping, and
              other fees. Some conditions apply and all transactions are subject
              to approval by Affirm. Visit{' '}
              <a
                href={'https://helpcenter.affirm.com/s/'}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Affirm FAQ
              </a>
              {' for further information.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductForm.propTypes = {
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
export default ProductForm
