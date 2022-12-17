import { graphql, useStaticQuery } from 'gatsby'

const ProductData = () => {
  const { mattressVilleLogo, couponLogo} = useStaticQuery(graphql`
    {
      mattressVilleLogo: file(relativePath: { eq: "mattressville-slogan.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 45
          )
        }
      }
      couponLogo: file(relativePath: { eq: "gift-lg.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:150
          )
        }
      }
    }
  `)

  return {
    mainData: {
      logo: mattressVilleLogo,
      couponImage: couponLogo,
    },
  }
}

export default ProductData
