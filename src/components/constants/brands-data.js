import { graphql, useStaticQuery } from 'gatsby'

const BrandsData = () => {
  return useStaticQuery(graphql`
    {
      mattressVille: file(relativePath: { eq: "mville-new.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            width: 100
            transformOptions: { cropFocus: CENTER, fit: CONTAIN }
          )
        }
      }
      natura: file(relativePath: { eq: "natura.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 60
          )
        }
      }
      serta: file(relativePath: { eq: "serta.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 60
          )
        }
      }
      brandSealy: file(relativePath: { eq: "sealy.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 60
          )
        }
      }
      beautyrestHarmony: file(relativePath: { eq: "beautyrest-harmony.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      kingsDown: file(relativePath: { eq: "kingsdown.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 60
          )
        }
      }
      BeautyrestHarmonyLux: file(relativePath: { eq: "beautyrest-lux.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 50
          )
        }
      }
      EcoComfort: file(relativePath: { eq: "ecocomfort.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 44
          )
        }
      }
      GalaxyBedding: file(relativePath: { eq: "galaxy.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      Rosemount: file(relativePath: { eq: "Rosemount.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 39
          )
        }
      }
      stearnsNFoster: file(relativePath: { eq: "sf.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 40
          )
        }
      }
      tempur: file(relativePath: { eq: "tempur.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 40
          )
        }
      }
      Titus: file(relativePath: { eq: "titus.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 43
          )
        }
      }
    }
  `)
}

export default BrandsData
