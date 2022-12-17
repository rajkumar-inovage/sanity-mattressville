import { graphql, useStaticQuery } from 'gatsby'

const ArchiveCollectionData = () => {
  const { allMattressImage, allAccessoriesImage } = useStaticQuery(graphql`
    {
      allMattressImage: file(
        relativePath: { eq: "mattressville-view-all.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 480
          )
        }
      }
      allAccessoriesImage: file(
        relativePath: { eq: "mattressville-accessories.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:480
          )
        }
      }
    }
  `)
  return {
    entrydata: {
      allmattressimage: allMattressImage,
      allmattressimageAlt:
        `three mattresses stacked vertically on a floor, all mattresses`,
      allmattressdescription: '',
      allaccessoriesimage: allAccessoriesImage,
      allaccessoriesimageAlt:
        `pillows and rolled up duvet on top of a mattress, accessories`,
      allaccessoriesdescription: '',
    },
  }
}

export default ArchiveCollectionData
