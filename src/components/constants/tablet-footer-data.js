import { graphql, useStaticQuery } from 'gatsby'

const TabletFooterData = () => {
  const { gPay, shopPay, payBright, visa, masterCard, payPal } =
    useStaticQuery(graphql`
      {
        visa: file(relativePath: { eq: "visa.png" }) {
          childImageSharp {
            gatsbyImageData(
              formats: AUTO
              placeholder: DOMINANT_COLOR
              width: 60
              height: 38
            )
          }
        }
        gPay: file(relativePath: { eq: "g-pay.png" }) {
          childImageSharp {
            gatsbyImageData(
              formats: AUTO
              placeholder: DOMINANT_COLOR
              width: 60
              height: 38
            )
          }
        }
        shopPay: file(relativePath: { eq: "shop-pay.png" }) {
          childImageSharp {
            gatsbyImageData(
              formats: AUTO
              placeholder: DOMINANT_COLOR
              width: 60
              height: 38
            )
          }
        }
        payBright: file(relativePath: { eq: "affirm-footer-logo.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              formats: AUTO
              placeholder: DOMINANT_COLOR
              width: 60
              height: 38
            )
          }
        }
        masterCard: file(relativePath: { eq: "master-card.png" }) {
          childImageSharp {
            gatsbyImageData(
              formats: AUTO
              placeholder: DOMINANT_COLOR
              width: 60
              height: 38
            )
          }
        }
        payPal: file(relativePath: { eq: "pay-pal.png" }) {
          childImageSharp {
            gatsbyImageData(
              formats: AUTO
              placeholder: DOMINANT_COLOR
              width: 60
              height: 38
            )
          }
        }
      }
    `)

  return {
    tabletFooter: {
      accordionData: {
        about: {
          title: `About Us`,
          desc: `<p>Mattressville is a top quality bedding products retailer aiming to provide you the premium sleeping experience with our wide array of mattresses at a price that is easy on your pocket.</p>`,
          mail: `info@mattressville.ca`,
          menu: [
            {
              link: `/privacy-policy/`,
              label: `Privacy Policy`,
            },
            {
              link: `/terms-and-conditions/`,
              label: `Terms & Conditions`,
            },
            {
              link: `/refund-policy/`,
              label: `Refund Policy`,
            },
            {
              link: `/price-match-guarantee/`,
              label: `Price Match Guarantee`,
            },
            {
              link: `/60-days-comfort-guarantee/`,
              label: `60 Days Comfort Guarantee`,
            },
          ],
        },
        stylesTypes: {
          title: `Styles/Types`,
          styleType: [
            { link: `/all-mattresses/memory-foam/`, label: `Memory Foam` },
            { link: `/all-mattresses/pocket-coil/`, label: `Pocket Coil` },
            { link: `/all-mattresses/hybrid/`, label: `Hybrid` },
            {
              link: `/all-mattresses/pillow-top-euro-top/`,
              label: `Pillow Top/Euro Top`,
            },
            {
              link: `/all-mattresses/organic-latex/`,
              label: `Organic Latex`,
            },
            { link: `/all-mattresses/tight-top/`, label: `Tight Top` },
            {
              link: `/all-mattresses/continuous-coil/`,
              label: `Continuous Coil`,
            },
            {
              link: `/all-mattresses/mattress-in-a-box/`,
              label: `Mattress In A Box`,
            },
            {
              link: `/all-mattresses/foam/`,
              label: `Foam`,
            },
          ],
        },
        location: {
          title: `Delivery Areas`,
          areas: [
            [
              { link: `/brampton/`, label: `Brampton` },
              { link: `/burlington/`, label: `Burlington` },
              { link: `/georgetown/`, label: `Georgetown` },
              { link: `/hamilton/`, label: `Hamilton` },
              { link: `/markham/`, label: `Markham` },
              { link: `/mississauga/`, label: `Mississauga` },
            ],
            [
              { link: `/oakville/`, label: `Oakville` },
              { link: `/pickering/`, label: `Pickering` },
              { link: `/richmond-hill/`, label: `Richmond Hill` },
              { link: `/scarborough/`, label: `Scarborough` },
              { link: `/toronto/`, label: `Toronto` },
              { link: `/vaughan/`, label: `Vaughan` },
            ],
          ],
        },
        brands: {
          title: `Brands`,
          brandType: [
            { link: `/brands/mattressville/`, label: `Mattressville` },
            { link: `/brands/sealy/`, label: `Sealy` },
            { link: `/brands/beautyrest/`, label: `Beautyrest` },
            {
              link: `/brands/serta-icomfort/`,
              label: `Serta iComfort`,
            },
            { link: `/brands/tempur-pedic/`, label: `Tempur-Pedic` },
            {
              link: `/brands/stearns-and-foster/`,
              label: `Stearns & Foster`,
            },
            { link: `/brands/kingsdown/`, label: `Kingsdown` },
            {
              link: `/brands/galaxy-bedding/`,
              label: `Galaxy Bedding`,
            },
            {
              link: `/brands/natura/`,
              label: `Natura`,
            },
            {
              link: `/brands/serta/`,
              label: `Serta`,
            },
          ],
        },
      },
      paySafe: {
        gPay,
        shopPay,
        payBright,
        visa,
        masterCard,
        payPal,
      },
      copyright: `© 2022 online mattress store - mattressville.ca. All Rights Reserved.`,
      socialMedia: [
        {
          link: `https://twitter.com/mattressville1`,
          icon: `gs-twitter-alt`,
        },
        {
          link: `https://www.facebook.com/mattressville`,
          icon: `gs-facebook-alt`,
        },
        {
          link: `https://www.instagram.com/mattressvilleca/`,
          icon: `gs-instagram`,
        },
      ],
    },
  }
}

export default TabletFooterData
