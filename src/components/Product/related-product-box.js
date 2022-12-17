import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Accordion } from 'react-bootstrap'
import ReactHtmlParser from 'html-react-parser'

import GSIcon from '~/components/gs-icon'
import Brand from '~/components/Brand'
import getQueenVariant from '~/components/functions/get-queen-variant'
import GetScore from '~/components/functions/get-score'
import inMississauga from '~/components/functions/in-mississauga'
import isCanadaWide from '~/components/functions/is-canada-wide'
import isOnlineExclusive from '~/components/functions/is-online-exclusive'
import GetPrice from '~/components/functions/get-price'

const RelatedProductBox = ({ product }) => {
  const [toggleLabel, setToggleLabel] = useState('more'),
    [toggleIcon, setToggleIcon] = useState('down'),
    {
      variants: {
        edges: [initialVariant],
      },
    } = product,
    queenVariant = getQueenVariant(product.variants),
    displayVariant = queenVariant ? queenVariant.node : initialVariant.node

  return (
    <div className={'box'}>
      <Link className={'wrap'} to={`/products/${product.handle}`}>
        <div
          className={`product ${
            product.productType === 'Mattresses' ? 'mattress' : 'accessories'
          }`}
        >
          <div className={'content'}>
            <div className={'d-flex'}>
              <h5 className={'title'}>
                <strong className={'d-block'}>{product.title}</strong>
              </h5>
            </div>
            {product.images.edges && (
              <img
                src={product.images.edges[0].node.transformedSrc}
                alt={
                  product.images.edges[0].node.altText
                    ? product.images.edges[0].node.altText
                    : product.handle
                }
                loading={'lazy'}
                height={170}
                width={258}
                className={'image'}
              />
            )}
            <div className={'info'}>
              <div className={'flex-grow-1 my-auto'}>
                <Brand productVendor={product.vendor} />
              </div>
              <div className={'flex-shrink-1 my-auto text-right'}>
                <h6
                  className={'price-title'}
                >{`OUR PRICE [${displayVariant.selectedOptions[0].value.replace(
                  ' ',
                  ''
                )}]`}</h6>
                <h3 className={'price'}>
                  {ReactHtmlParser(GetPrice(displayVariant.priceV2.amount))}
                </h3>
                {displayVariant.compareAtPriceV2 && (
                  <React.Fragment>
                    <h6 className={'compare-at-title'}>{`Compare At`}</h6>
                    <span className={'compare-price'}>
                      {ReactHtmlParser(
                        GetPrice(displayVariant.compareAtPriceV2.amount)
                      )}
                    </span>
                  </React.Fragment>
                )}
              </div>
            </div>
            {product.productType === 'Mattresses' && (
              <div className={'d-flex justify-content-center'}>
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
              </div>
            )}
          </div>
        </div>
      </Link>
      <Accordion className={'more-details'}>
        <h6 className={'heading'}>
          <Accordion.Toggle
            as={'a'}
            className={'toggle-details'}
            eventKey={'0'}
            onClick={() => {
              toggleLabel === 'more'
                ? setToggleLabel('less')
                : setToggleLabel('more')
              toggleIcon === 'down'
                ? setToggleIcon('up')
                : setToggleIcon('down')
            }}
          >
            <span>{`Show ${toggleLabel} details`}</span>
            <GSIcon icon={`gs-chevron-${toggleIcon}`} />
          </Accordion.Toggle>
        </h6>
        <Accordion.Collapse eventKey={'0'}>
          <div className={'details'}>
            {product.card_features &&
              ReactHtmlParser(product.card_features.value)}
            <p style={{ color: '#008c00' }}>{`In stock.`}</p>
            <div className={'d-flex justify-content-between w-100'}>
              <div className={'province'}>
                <GSIcon
                  icon={
                    inMississauga(product.tags)
                      ? 'gs-check-square'
                      : 'gs-square'
                  }
                />
                <span>{'Mississauga'}</span>
              </div>
              <div className={'country'}>
                <GSIcon
                  icon={
                    isCanadaWide(product.tags) ? 'gs-check-square' : 'gs-square'
                  }
                />
                <span>{'Canada Wide Shipping'}</span>
              </div>
            </div>
            <div className={'d-flex justify-content-center mt-3'}>
              <div className={'country'}>
                <GSIcon
                  icon={
                    isOnlineExclusive(product.tags)
                      ? 'gs-check-square'
                      : 'gs-square'
                  }
                />
                <span>{'Online Exclusive'}</span>
              </div>
            </div>
          </div>
        </Accordion.Collapse>
      </Accordion>
      <Link to={`/products/${product.handle}`} className={'btn-shop'}>
        Shop Now
      </Link>
    </div>
  )
}

export default RelatedProductBox
