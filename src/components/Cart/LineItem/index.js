import React, { useContext, useState } from 'react'
import ReactHtmlParser from 'html-react-parser'

import GetPrice from '~/components/functions/get-price'
import StoreContext from '~/context/StoreContext'
import GSIcon from '~/components/gs-icon'

const LineItem = ({ item }) => {
  const {
      removeLineItem,
      updateLineItem,
      store: { client, checkout },
    } = useContext(StoreContext),
    [quantity, setQuantity] = useState(item.quantity),
    variantImage = item.variant.image ? (
      <img
        src={item.variant.image.src}
        alt={`${item.title} product shot`}
        height={'60px'}
      />
    ) : null,
    getSelectedOptions = findName => {
      const foundOption = item.variant.selectedOptions.find(
        ({ name }) => findName === name
      )
      return foundOption ? foundOption.value : ''
    },
    updateQuantity = newQuantity => {
      setQuantity(newQuantity)
      newQuantity !== 0
        ? updateLineItem(client, checkout.id, item.id, newQuantity)
        : removeLineItem(client, checkout.id, item.id)
    },
    dropQuantity = () => {
      if (quantity === 0) {
        return false
      }
      quantity >= 0 && updateQuantity(quantity - 1)
    },
    raiseQuantity = () => {
      updateQuantity(quantity + 1)
    }

  return (
    <div className={'items-row d-block d-lg-flex no-gutters'}>
      <div className={'item-meta col-12 col-lg-5 d-flex'}>
        <button
          type={'button'}
          className={'item-remove'}
          onClick={() => removeLineItem(client, checkout.id, item.id)}
          aria-label={'Remove Item'}
          title={'Remove Item'}
        >
          <GSIcon icon={'gs-x'} />
        </button>
        <div className={'item-image'}>{variantImage}</div>
        <div className={'text item-name'}>
          <p>{item.title}</p>
          <strong>{ReactHtmlParser(getSelectedOptions('Options'))}</strong>
        </div>
      </div>
      <div
        className={
          'text item-size mt-3 mt-lg-0 col-12 col-lg-2 text-right text-lg-left'
        }
      >
        <strong className={'size-label d-lg-none pr-4'}>Size:</strong>{' '}
        {ReactHtmlParser(getSelectedOptions('Size'))}
      </div>
      <div
        className={'text item-quantity col-12 col-lg-2 text-right text-lg-left'}
      >
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
      <div
        className={'text item-price col-12 col-lg-1 text-right text-lg-left'}
      >
        <strong className={'price-label d-lg-none pr-4'}>Price:</strong>
        {GetPrice(item.variant.price.amount)}
      </div>
      <div className={'text subtotal col-12 col-lg-2 text-right'}>
        <strong className={'total-label d-lg-none pr-4'}>Subtotal:</strong>
        {GetPrice(item.variant.price.amount * quantity)}
      </div>
    </div>
  )
}

export default LineItem
