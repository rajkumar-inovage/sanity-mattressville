import React, { Fragment } from 'react'
import ReactHtmlParser from 'html-react-parser'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

import ArrRight from '~/components/icons/arr-right'
import FormatDate from '~/components/functions/format-date'
import isCouponExpired from '~/components/functions/coupon-expired'

const Card = ({
  couponImg,
  heading,
  description,
  expiry,
  code,
  link,
  condition,
}) => {
  false && console.log(code)

  return !isCouponExpired(expiry) ? (
    <Fragment>
      <div className={'card-container'}>
        <div className={'row no-gutters'}>
          <div className={'col-xl-7 col-12'}>
            <div
              className={
                'd-flex h-100 align-items-center justify-content-center'
              }
            >
              <GatsbyImage
                image={couponImg.localImage.childImageSharp.gatsbyImageData}
                alt={'cashcoupon'}
                className={'cashcoupon-img'}
              />
            </div>
          </div>
          <div className={'col-xl-5 col-12'}>
            <div className={'card-content'}>
              <h2 className={'card-heading'}>{heading}</h2>
              {description && ReactHtmlParser(description)}
              {expiry !== false && (
                <p className={'card-para'}>
                  <strong>
                    Expires: {FormatDate(new Date(expiry), 'MMMM dd, yyyy')}
                  </strong>
                </p>
              )}
              <Link to={link} className={'btn'}>
                <span className={'btn-text'}>START SAVING</span>
                <ArrRight width={24} height={11} stroke={'#ffffff'} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {condition && ReactHtmlParser(condition)}
    </Fragment>
  ) : null
}

export default Card
