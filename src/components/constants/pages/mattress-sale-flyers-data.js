import { graphql, useStaticQuery } from 'gatsby'

// import getFlyerType from '~/components/functions/flyer-type'

const MattressSaleFlyerData = () => {
  const { bannerImage } = useStaticQuery(graphql`
    {
      bannerImage: file(relativePath: { eq: "mattressville_flyers.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 375
          )
        }
      }
    }
  `)

  return {
    seoData: {
      title: `Mattress Sale Flyers`,
      description: `Check out our current promotional mattress sale flyers and save more on your new mattress purchase. Mattressville has the best deals on premium mattresses. Shop online or visit us in Mississauga`,
      ogPath: '/mattress-sale-flyers/',
    },
    mainData: {
      flyerImage: bannerImage,
      flyerImageAlt:
        'two mattress sale holiday flyers, woman sitting on bed on her phone, mattress sale flyers',
      entryDesc: `<p><strong>Check our exclusive coupons to save even more on your new product purchase.</strong> We encourage you to use our coupons to get the full benefits of your shopping experience with Mattressville.</p>`,
      flyerTypes: [
        {
          type: 'GTA',
          label: 'GTA Only Flyer',
        },
        {
          type: 'CW',
          label: 'View Our Canada',
        },
      ],
      // flyers: shopifyFlyersData.map(
      //   ({ flyer: { description, image, tags, title } }) => {
      //     return {
      //       image,
      //       title,
      //       description,
      //       type: getFlyerType(tags),
      //     }
      //   }
      // ),
    },
  }
}

export default MattressSaleFlyerData
