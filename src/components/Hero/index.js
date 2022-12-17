import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { Container } from 'react-bootstrap'

import HeroSlider from './heroSlider'
import CategorySlider from './categorySlider'
import BannerSlider from './bannerSlider'
import isTablet from '~/components/functions/is-tablet'

const Hero = ({
  data: {
    bed,
    bedLg,
    gift,
    giftLg,
    heroSlider,
    bannerSlider,
    categoryHeader,
    categorySlider,
  },
}) => (
  <Fragment>
    <section className={'hero'}>
      <Container fluid={true}>
        <div className={'hero-outer'}>
          <div className={'hero-inner'}>
            <div
              className={
                'd-flex flex-column flex-xl-row justify-content-between'
              }
            >
              <BannerSlider bannerSlider={bannerSlider} />
              <div className={'right-sidebar flex-shrink-1'}>
                <div
                  className={'d-flex flex-xl-column justify-xl-content-center'}
                >
                  <Link
                    to={'/mattress-matchmaker/'}
                    className={'sidebar-content text-decoration-none'}
                  >
                    <img
                      loading={'lazy'}
                      src={
                        isTablet()
                          ? bed.childImageSharp.gatsbyImageData.images.fallback
                              .src
                          : bedLg.childImageSharp.gatsbyImageData.images
                              .fallback.src
                      }
                      alt={`A pink color Mattressville matchmaker heart icon`}
                      height={
                        isTablet()
                          ? bed.childImageSharp.gatsbyImageData.height
                          : bedLg.childImageSharp.gatsbyImageData.height
                      }
                      width={
                        isTablet()
                          ? bed.childImageSharp.gatsbyImageData.width
                          : bedLg.childImageSharp.gatsbyImageData.width
                      }
                    />
                    <span className={'d-block text-center card-title w-100'}>
                      Mattress Matchmaker
                    </span>
                  </Link>
                  <Link
                    to={'/coupons/'}
                    className={'sidebar-content text-decoration-none'}
                  >
                    <img
                      loading={'lazy'}
                      src={
                        isTablet()
                          ? gift.childImageSharp.gatsbyImageData.images.fallback
                              .src
                          : giftLg.childImageSharp.gatsbyImageData.images
                              .fallback.src
                      }
                      alt={'A blue color gift box icon with white ribbon wrapped to it'}
                      height={
                        isTablet()
                          ? gift.childImageSharp.gatsbyImageData.height
                          : giftLg.childImageSharp.gatsbyImageData.height
                      }
                      width={
                        isTablet()
                          ? gift.childImageSharp.gatsbyImageData.width
                          : giftLg.childImageSharp.gatsbyImageData.width
                      }
                    />
                    <span className={'d-block text-center card-title w-100'}>
                      Coupons & Deals
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <CategorySlider header={categoryHeader} slider={categorySlider} />
        </div>
      </Container>
    </section>
    <HeroSlider slides={heroSlider} />
  </Fragment>
)

export default Hero
