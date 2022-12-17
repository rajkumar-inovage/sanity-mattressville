import { graphql, useStaticQuery } from 'gatsby'

const HomeBannerSlider = () => {
  const { sliderData } = useStaticQuery(graphql`
    {
      sliderData: allSanityHomePageBannerSlider {
        nodes {
          tagline
          bannerLink
          slidertitle
          poster {
            asset {
              gatsbyImageData(width: 980)
              url
            }
          }
        }
      }
    }
  `)

  return {
    slides: sliderData,
  }
}
export default HomeBannerSlider
