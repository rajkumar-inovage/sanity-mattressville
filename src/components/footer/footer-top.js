import React from 'react'
import { Link } from 'gatsby'
import ReactHtmlParser from 'html-react-parser'

const FooterTop = ({ data }) => {
  const { brands, stylesTypes, about, location, footerbadge, badgeAltText } = data

  return (
    <div className={'footer-top'}>
      <div className={'container-fluid'}>
        <div
          className={
            'd-flex flex-lg-row flex-column justify-content-between sections'
          }
        >
          <div className={'about w-100'}>
            <Link className={'section-title'} to={'/why-mattressville/'}>
              {about.title}
            </Link>
            {ReactHtmlParser(about.desc)}
            <Link className={'section-title'} to={'/contact-us/'}>
              {about.contact}
            </Link>
            <p style={{ marginBottom: 0 }}>{about.address}</p>
            <p style={{ marginBottom: 0 }}>{about.phone}</p>
            <span className={'mail-us'}>{about.mail}</span>
          </div>
          <div className={'brands w-100'}>
            <h3 className={'section-title'}>{brands.title}</h3>
            <div className={'areas'}>
              {brands.brandType.map(({ link, label }, index) => (
                <Link key={index} to={link}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className={'style-type w-100'}>
            <h3 className={'section-title'}>{stylesTypes.title}</h3>
            <div className={'d-flex w-100'}>
              <div className={'areas'}>
                {stylesTypes.styleType.map(({ link, label }, index) => (
                  <Link key={index} to={link}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className={'location w-100'}>
            <h3 className={'section-title'}>{location.title}</h3>
            <div className={'d-flex w-100 justify-content-between'}>
              {location.areas.map((colData, keyIndex) => (
                <div key={keyIndex} className={'areas'}>
                  {colData.map(({ link, label }, index) => (
                    <Link key={index} to={link}>
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className={'badge-image'}>
              <img
                src={
                  footerbadge.childImageSharp.gatsbyImageData.images.fallback
                    .src
                }
                alt={badgeAltText}
                className={'footer-badge'}
                loading={'lazy'}
                height={footerbadge.childImageSharp.gatsbyImageData.height}
                width={footerbadge.childImageSharp.gatsbyImageData.width}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterTop
