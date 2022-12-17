import React from 'react'

import GSIcon from '~/components/gs-icon'

const FooterTablet = ({ data }) => {
  const {
    paySafe: { gPay, shopPay, payBright, visa, masterCard, payPal },
    copyright,
    socialMedia,
  } = data

  return (
    <div className={'footer-bottom'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-column'}>
          <div className={'pay-safe w-100'}>
            <div className={'payment-mods'}>
              <img
                src={gPay.childImageSharp.gatsbyImageData.images.fallback.src}
                alt={'gPay'}
                loading={'lazy'}
                height={gPay.childImageSharp.gatsbyImageData.height}
                width={gPay.childImageSharp.gatsbyImageData.width}
              />
              <img
                src={
                  shopPay.childImageSharp.gatsbyImageData.images.fallback.src
                }
                alt={'shopPay'}
                loading={'lazy'}
                height={shopPay.childImageSharp.gatsbyImageData.height}
                width={shopPay.childImageSharp.gatsbyImageData.width}
              />
              <img
                src={
                  payBright.childImageSharp.gatsbyImageData.images.fallback.src
                }
                alt={'pay-bright'}
                loading={'lazy'}
                height={payBright.childImageSharp.gatsbyImageData.height}
                width={payBright.childImageSharp.gatsbyImageData.width}
              />
              <img
                src={visa.childImageSharp.gatsbyImageData.images.fallback.src}
                alt={'visa'}
                loading={'lazy'}
                height={visa.childImageSharp.gatsbyImageData.height}
                width={visa.childImageSharp.gatsbyImageData.width}
              />
              <img
                src={
                  masterCard.childImageSharp.gatsbyImageData.images.fallback.src
                }
                alt={'master-card'}
                loading={'lazy'}
                height={masterCard.childImageSharp.gatsbyImageData.height}
                width={masterCard.childImageSharp.gatsbyImageData.width}
              />
              <img
                src={payPal.childImageSharp.gatsbyImageData.images.fallback.src}
                alt={'pay-pal'}
                loading={'lazy'}
                height={payPal.childImageSharp.gatsbyImageData.height}
                width={payPal.childImageSharp.gatsbyImageData.width}
              />
            </div>
          </div>
          <div className={'copyright w-100'}>
            <p>{copyright}</p>
          </div>
          <div className={'social-media w-100'}>
            {socialMedia.map(({ link, icon }, index) => (
              <a
                key={index}
                href={link}
                target={'_blank'}
                rel={'nofollow noreferrer'}
                className={'media-link'}
              >
                <GSIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterTablet
