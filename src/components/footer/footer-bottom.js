import React from 'react'
import { Link } from 'gatsby'

import GSIcon from '~/components/gs-icon'

const FooterBottom = ({ data }) => {
  const { menu, copyright, socialMedia, logo, paySafe } = data

  return (
    <div className={'footer-bottom'}>
      <div className={'container-fluid'}>
        <div className={'d-lg-flex'}>
          <div className={'flex-shrink-1 my-auto'}>
            <div className={'d-flex justify-content-center'}>
              <img
                src={logo.childImageSharp.gatsbyImageData.images.fallback.src}
                alt={'Mattressville logo in grey colored text'}
                className={'footer-logo'}
                loading={'lazy'}
                height={`auto`}
                width={logo.childImageSharp.gatsbyImageData.width}
              />
            </div>
          </div>
          <div className={'flex-grow-1 my-auto'}>
            <div className={'right-area'}>
              <div className={'footer-upper'}>
                <div
                  className={
                    'menu d-flex flex-sm-row flex-column align-items-center justify-content-between'
                  }
                >
                  {menu.map(({ link, label }, index) => (
                    <Link key={index} to={link} className={'menu-link'}>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={
                  'footer-below d-flex flex-sm-row flex-column align-items-start'
                }
              >
                <div className={'copyright flex-grow-1 my-sm-auto'}>
                  {copyright}
                </div>
                <div className={'flex-grow-1 my-auto'}>
                  <div
                    className={
                      'd-flex flex-xl-row flex-column justify-content-between align-items-xl-center align-items-end'
                    }
                  >
                    <div className={'payment-mods mb-xl-0 mb-3'}>
                      <img
                        src={
                          paySafe.gPay.childImageSharp.gatsbyImageData.images
                            .fallback.src
                        }
                        alt={'Google pay logo'}
                        loading={'lazy'}
                        height={
                          paySafe.gPay.childImageSharp.gatsbyImageData.height
                        }
                        width={
                          paySafe.gPay.childImageSharp.gatsbyImageData.width
                        }
                      />
                      <img
                        src={
                          paySafe.shopPay.childImageSharp.gatsbyImageData.images
                            .fallback.src
                        }
                        alt={'Shop pay logo'}
                        loading={'lazy'}
                        height={
                          paySafe.shopPay.childImageSharp.gatsbyImageData.height
                        }
                        width={
                          paySafe.shopPay.childImageSharp.gatsbyImageData.width
                        }
                      />
                      <img
                        src={
                          paySafe.payBright.childImageSharp.gatsbyImageData
                            .images.fallback.src
                        }
                        alt={'affirm logo'}
                        loading={'lazy'}
                        height={
                          paySafe.payBright.childImageSharp.gatsbyImageData
                            .height
                        }
                        width={
                          paySafe.payBright.childImageSharp.gatsbyImageData
                            .width
                        }
                      />
                      <img
                        src={
                          paySafe.visa.childImageSharp.gatsbyImageData.images
                            .fallback.src
                        }
                        alt={'Visa logo'}
                        loading={'lazy'}
                        height={
                          paySafe.visa.childImageSharp.gatsbyImageData.height
                        }
                        width={
                          paySafe.visa.childImageSharp.gatsbyImageData.width
                        }
                      />
                      <img
                        src={
                          paySafe.masterCard.childImageSharp.gatsbyImageData
                            .images.fallback.src
                        }
                        alt={'Master card logo'}
                        loading={'lazy'}
                        height={
                          paySafe.masterCard.childImageSharp.gatsbyImageData
                            .height
                        }
                        width={
                          paySafe.masterCard.childImageSharp.gatsbyImageData
                            .width
                        }
                      />
                      <img
                        src={
                          paySafe.payPal.childImageSharp.gatsbyImageData.images
                            .fallback.src
                        }
                        alt={'Pay pal logo'}
                        loading={'lazy'}
                        height={
                          paySafe.payPal.childImageSharp.gatsbyImageData.height
                        }
                        width={
                          paySafe.payPal.childImageSharp.gatsbyImageData.width
                        }
                      />
                    </div>
                    <div className={'social-media'}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterBottom
