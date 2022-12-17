import { graphql, useStaticQuery } from 'gatsby'

import getCouponKey from '~/components/functions/coupon-key'
import getCouponCode from '~/components/functions/coupon-code'
import getCouponExpiry from '~/components/functions/coupon-expiry'
import getCouponLink from '~/components/functions/coupon-link'

const CouponsDealsData = () => {
  const {
    freecashcouponImage,
    cashcouponImage,
    cashcouponImage2,
    cashcouponImage3,
    cashcouponImage4,
    cashcouponImage5,
    cashcouponImage6,
    couponBanner,
    store: {
      shopifyCoupons: {
        couponsData: { coupons: shopifyCouponsData },
      },
    },
  } = useStaticQuery(graphql`
    {
      freecashcouponImage: file(relativePath: { eq: "FreeCoupon.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      cashcouponImage: file(relativePath: { eq: "cashcoupon.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      cashcouponImage2: file(relativePath: { eq: "cashcoupon2.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      cashcouponImage3: file(relativePath: { eq: "cashcoupon3.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      cashcouponImage4: file(relativePath: { eq: "cashcoupon4.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      cashcouponImage5: file(relativePath: { eq: "cashcoupon5.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      cashcouponImage6: file(relativePath: { eq: "cashcoupon6.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      couponBanner: file(
        relativePath: { eq: "mattressville_coupons_deals.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 375
          )
        }
      }
      store {
        shopifyCoupons: blog(handle: "coupons") {
          couponsData: articles(first: 250, sortKey: PUBLISHED_AT) {
            coupons: edges {
              coupon: node {
                title
                tags
                description: contentHtml
                image {
                  url
                  localImage {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return {
    seoData: {
      title: `Mattress Coupons & Offers in Toronto`,
      description: `Check our exclusive coupons to save more on your new mattress purchase. Enjoy the full benefits of your shopping with our coupons & offers. Call us!`,
      ogPath: '/coupons/',
    },
    mainData: {
      couponBannerImage: couponBanner,
      couponBannerAlt:
        'person putting money into piggy bank savings, coupson and deals',
      entryDesc: `<p><strong>Check our exclusive coupons to save even more on your new product purchase.</strong> We encourage you to use our coupons to get the full benefits of your shopping experience with Mattressville.</p>`,
      couponCategories: [
        {
          key: 'all',
          label: 'ALL COUPONS',
        },
        {
          key: 'sealy',
          label: 'SEALY',
        },
        {
          key: 'serta',
          label: 'SERTA',
        },
        {
          key: 'stearns-foster',
          label: 'STEARNS & FOSTER',
        },
        {
          key: 'beautyrest',
          label: 'BEAUTYREST',
        },
        {
          key: 'tempur-pedic',
          label: 'Tempur-Pedic',
        },
        {
          key: 'delivery',
          label: 'DELIVERY',
        },
        {
          key: 'accessories',
          label: 'ACCESSORIES',
        },
        {
          key: 'kingsdown',
          label: 'KINGSDOWN',
        },
        {
          key: 'natura',
          label: 'NATURA',
        },
      ],
      coupons: shopifyCouponsData.map(
        ({ coupon: { description, image, tags, title } }) => {
          return {
            image,
            title,
            description,
            key: getCouponKey(tags),
            code: getCouponCode(tags),
            expiry: getCouponExpiry(tags),
            link: getCouponLink(tags),
          }
        }
      ),
      couponsOld: [
        {
          key: 'delivery',
          image: freecashcouponImage,
          title: 'FREE LOCAL DELIVERY',
          description:
            '<p>Free Delivery coupon is automatically applied to all orders over $499 (before tax) or must be presented at time of purchase. FREE Delivery across the Greater Toronto Area.</p>',
          code: false,
          expiry: false,
          link: '/all-mattresses/',
        },
        {
          key: 'stearns-foster',
          image: cashcouponImage,
          title: 'STEARNS & FOSTER',
          description:
            '<p>Coupons can not be combined with any other offer or discount and do not have a cash value. Must be presented at time of purchase or can be applied online by entering coupon code: <strong>SF300</strong> at the checkout page. Mattressville has the right to void the coupons.</p>',
          code: 'SF300',
          expiry: 'June 15, 2021',
          link: '/brands/stearns-and-foster/',
        },
        {
          key: 'beautyrest',
          image: cashcouponImage2,
          title: 'SIMMONS BEAUTYREST HARMONY',
          description:
            '<p>Coupons can not be combined with any other offer or discount and do not have a cash value. Must be presented at time of purchase or can be applied online by entering coupon code: <strong>HAR150</strong> at the checkout page. Mattressville has the right to void the coupons.</p>',
          code: 'HAR150',
          expiry: 'June 15, 2021',
          link: '/brands/beautyrest/',
        },
        {
          key: 'beautyrest',
          image: cashcouponImage3,
          title: 'SIMMONS BEAUTYREST HARMONY LUX',
          description:
            '<p>Coupons can not be combined with any other offer or discount and do not have a cash value. Must be presented at time of purchase or can be applied online by entering coupon code: <strong>HAR150</strong> at the checkout page. Mattressville has the right to void the coupons.</p>',
          code: 'HAR150',
          expiry: 'June 15, 2021',
          link: '/brands/beautyrest/',
        },
        {
          key: 'tempur-pedic',
          image: cashcouponImage4,
          title: 'TEMPUR-PEDIC',
          description:
            '<p>Coupons can not be combined with any other offer or discount and do not have a cash value. Must be presented at time of purchase or can be applied online by entering coupon code: <strong>MEMO250</strong> at the checkout page. Mattressville has the right to void the coupons.</p>',
          code: 'MEMO250',
          expiry: 'June 15, 2021',
          link: '/brands/tempur-pedic/',
        },
        {
          key: 'beautyrest',
          image: cashcouponImage5,
          title: 'BEAUTYREST BLACK',
          description:
            '<p>Coupons can not be combined with any other offer or discount and do not have a cash value. Must be presented at time of purchase or can be applied online by entering coupon code: <strong>BRB200</strong> at the checkout page. Mattressville has the right to void the coupons.</p>',
          code: 'BRB200',
          expiry: 'June 15, 2021',
          link: '/brands/beautyrest/',
        },
        {
          key: 'sealy',
          image: cashcouponImage6,
          title: 'SEALY POSTUREPEDIC',
          description:
            '<p>Coupons can not be combined with any other offer or discount and do not have a cash value. Must be presented at time of purchase or can be applied online by entering coupon code: <strong>PRO100</strong> at the checkout page. Mattressville has the right to void the coupons.</p>',
          code: 'PRO100',
          expiry: 'June 15, 2021',
          link: '/brands/sealy/',
        },
      ],
      condition:
        '<p>*Coupons can not be combined with any other offer or discount and do not have a cash value. Mattressville has the right to void the coupons.</p>',
    },
  }
}

export default CouponsDealsData
