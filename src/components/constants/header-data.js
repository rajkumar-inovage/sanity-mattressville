import { graphql, useStaticQuery } from 'gatsby'

const HeaderData = () => {
  const { siteLogo, bedXS } = useStaticQuery(graphql`
    {
      siteLogo: file(relativePath: { eq: "mattressville-logo-no-slogan.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 30
          )
        }
      }
      bedXS: file(relativePath: { eq: "bed-xs.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
    }
  `)

  return {
    topHeader: {
      siteUrl: `/`,
      siteLogo,
      altText:`Mattressville.ca logo`,
      searchIcon: `gs-search`,
      userIcon: `gs-user`,
      cartIcon: `gs-shopping-cart`,
      searchPlaceholder: `Search by brand, model...`,
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
      myAccountLabel: `My Account`,
      cartLabel: `Cart Items`,
    },
    middleHeader: {
      phoneIcon: `gs-phone`,
      phoneNumber: `1 905-212-7722`,
      link: `/contact-us/`,
      contact: `Contact Us`,
      offer: `FREE Shipping over $499`,
    },
    mainMenu: [
      {
        link: `#`,
        label: `All Mattresses`,
        megaMenu: [
          {
            columnLabel: `STYLES/TYPES`,
            menuItems: [
              {
                link: `/all-mattresses/memory-foam/`,
                label: `Memory Foam`,
              },
              {
                link: `/all-mattresses/pocket-coil/`,
                label: `Pocket Coil`,
              },
              {
                link: `/all-mattresses/hybrid/`,
                label: `Hybrid`,
              },
              {
                link: `/all-mattresses/pillow-top-euro-top/`,
                label: `Pillow Top/Euro Top`,
              },
              {
                link: `/all-mattresses/organic-latex/`,
                label: `Organic Latex`,
              },
              {
                link: `/all-mattresses/tight-top/`,
                label: `Tight Top`,
              },
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
          {
            columnLabel: `BRANDS`,
            menuItems: [
              {
                link: `/brands/sealy/`,
                label: `Sealy`,
              },
              {
                link: `/brands/beautyrest/`,
                label: `Beautyrest`,
              },
              {
                link: `/brands/serta-icomfort/`,
                label: `Serta iComfort`,
              },
              {
                link: `/brands/tempur-pedic/`,
                label: `Tempur-Pedic`,
              },
              {
                link: `/brands/stearns-and-foster/`,
                label: `Stearns & Foster`,
              },
              {
                link: `/brands/kingsdown/`,
                label: `Kingsdown`,
              },
              {
                link: `/brands/mattressville/`,
                label: `Mattressville`,
              },
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
          {
            columnLabel: `SHOP BY BUDGET`,
            menuItems: [
              {
                link: `/all-mattresses/up-to-300/`,
                label: `UP TO $300`,
              },
              {
                link: `/all-mattresses/301-600/`,
                label: `$301 - $600`,
              },
              {
                link: `/all-mattresses/601-900/`,
                label: `$601 - $900`,
              },
              {
                link: `/all-mattresses/901-1200/`,
                label: `$901 - $1200`,
              },
              {
                link: `/all-mattresses/1201-1500/`,
                label: `$1201 - $1500`,
              },
              {
                link: `/all-mattresses/1500-and-up/`,
                label: `$1500 AND UP`,
              },
            ],
          },
          {
            columnLabel: `SIZES`,
            menuItems: [
              {
                link: `/all-mattresses/twin-single/`,
                label: `Twin/Single`,
              },
              {
                link: `/all-mattresses/twin-xl-single-xl/`,
                label: `Twin XL/Single XL`,
              },
              {
                link: `/all-mattresses/full-double/`,
                label: `Full/Double`,
              },
              {
                link: `/all-mattresses/queen/`,
                label: `Queen`,
              },
              {
                link: `/all-mattresses/king/`,
                label: `King`,
              },
            ],
          },
          {
            columnLabel: `FIRMNESS`,
            menuItems: [
              {
                link: `/all-mattresses/soft/`,
                label: `Soft`,
              },
              {
                link: `/all-mattresses/medium/`,
                label: `Medium`,
              },
              {
                link: `/all-mattresses/firm/`,
                label: `Firm`,
              },
              {
                link: `/all-mattresses/extra-firm/`,
                label: `Extra Firm`,
              },
            ],
          },
          {
            columnLabel: `COUPONS & DEALS`,
            menuItems: [
              {
                link: `/coupons/`,
                label: `Coupons`,
              },
              {
                link: `/all-mattresses/flash-deals/`,
                label: `Flash Deals`,
              },
              {
                link: `/all-mattresses/clearance/`,
                label: `Clearance`,
              },
              {
                link: `/mattress-sale-flyers/`,
                label: `Flyers`,
              },
            ],
          },
        ],
        megaMenuBottom: {
          link: `/all-mattresses/`,
          label: `VIEW ALL MATTRESSES`,
        },
      },
      {
        link: `/accessories/adjustable-beds/`,
        label: `Adjustable Bed Bases`,
      },
      {
        link: `#`,
        label: `Bedroom Furniture`,
        subMenu: [
          {
            link: `/accessories/furniture-beds/`,
            label: `Beds`,
          },
        ],
      },
      {
        link: `#`,
        label: `Accessories`,
        subMenu: [
          { link: '/accessories/', label: 'All Accessories' },
          { link: '/accessories/pillows/', label: 'Pillows' },
          { link: '/accessories/bed-frames/', label: 'Bed frames' },
          {
            link: '/accessories/mattress-protectors/',
            label: 'Mattress protectors',
          },
          {
            link: '/accessories/box-springs/',
            label: 'Box springs',
          },
          { link: '/accessories/', label: 'Mattress toppers' },
        ],
      },
      {
        link: `#`,
        label: `Coupons & Deals`,
        subMenu: [
          {
            link: `/coupons/`,
            label: `Coupons`,
          },
          {
            link: `/all-mattresses/clearance/`,
            label: `Clearance`,
          },
          {
            link: `/all-mattresses/flash-deals/`,
            label: `Flash Deals`,
          },
          {
            link: `/mattress-sale-flyers/`,
            label: `Flyers`,
          },
        ],
      },
      {
        link: `/blog/`,
        label: `Blog`,
      },
      {
        link: `#`,
        label: `Why Us?`,
        subMenu: [
          {
            link: `/why-mattressville/`,
            label: `Why Mattressville`,
          },
          {
            link: `/mattress-foundation/`,
            label: `Mattress Foundation`,
          },
          {
            link: `/mattress-buying-guide/`,
            label: `Mattress Buying Guide`,
          },
          {
            link: `/choosing-the-right-mattress/`,
            label: `Choosing the Right Mattress`,
          },
          {
            link: `/local-delivery/`,
            label: `Local Delivery Area`,
          },
          {
            link: `/contact-us/`,
            label: `Contact Us`,
          },
        ],
      },
      {
        link: `/mattress-matchmaker/`,
        label: `Mattress Matchmaker`,
        useIcon: bedXS,
      },
    ],
  }
}
export default HeaderData
