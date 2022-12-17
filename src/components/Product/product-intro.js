import React from 'react'

import ReactHtmlParser from 'html-react-parser'

const ProductIntro = ({ vendor, title, card_features }) => {
  return (
    <div className={'product-intro'}>
      <h2 className={'vendor d-none'}>{vendor}</h2>
      <h1 className={'title mb-0'}>{title}</h1>
      {card_features && ReactHtmlParser(card_features)}
    </div>
  )
}

export default ProductIntro
