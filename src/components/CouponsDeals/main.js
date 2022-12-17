import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'html-react-parser'
import { GatsbyImage } from 'gatsby-plugin-image'

import Card from './Card'
//import GiftHeader from '~/components/icons/gift-header'
import capitalize from '~/components/functions/capitalize'

const Main = ({
  data: { entryDesc, couponCategories, coupons, condition, couponBannerImage, couponBannerAlt },
}) => {
  const [activeSet, updateActiveSet] = useState('all'),
    [activeCouponsSet, updateActiveCouponsSet] = useState([]),
    changeActiveCouponSet = setKey => {
      if (setKey === 'all') {
        updateActiveCouponsSet(coupons)
      } else {
        updateActiveCouponsSet(
          coupons.filter(({ key }) => {
            return setKey === key
          })
        )
      }
      updateActiveSet(setKey)
    }

  useEffect(() => {
    updateActiveCouponsSet(coupons)
  }, [coupons, updateActiveCouponsSet])

  return (
    <div className={'flex-grow-1'}>
      <div className={'product-main'}>
        <h1 className={'main-heading'}>Coupons & Deals</h1>
        <div className={'img-section'}>
          {/* <h2 className={'img-heading'}>Hot Coupons & Deals</h2>
          <GiftHeader className={'gift-img'} height={187} width={201} /> */}
          <GatsbyImage
              image={couponBannerImage.childImageSharp.gatsbyImageData}
              alt={couponBannerAlt}
              className={'coupon-image'}
            />
        </div>
        <div className={'para'}>{ReactHtmlParser(entryDesc)}</div>
        <div className={'header-box'}>
          {couponCategories.map(({ key, label }) => (
            <button
              key={key}
              type={'button'}
              className={`link${activeSet === key ? ' active' : ''}`}
              onClick={() => changeActiveCouponSet(key)}
            >
              {label}
            </button>
          ))}
        </div>
        {activeCouponsSet.length ? (
          activeCouponsSet.map(
            ({ image, title, description, code, expiry, link }, index) => {
              return (
                <Card
                  key={index}
                  couponImg={image}
                  heading={title}
                  description={description}
                  expiry={expiry}
                  code={code}
                  link={link}
                  condition={condition}
                />
              )
            }
          )
        ) : (
          <div className={'alert alert-info'} role={'alert'}>
            {`No coupons for ${capitalize(activeSet)}`}
          </div>
        )}
      </div>
    </div>
  )
}

export default Main
