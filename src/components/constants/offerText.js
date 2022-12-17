import { graphql, useStaticQuery } from 'gatsby'

const Offertext = () => {
  const { offerData } = useStaticQuery(graphql`
    {
      offerData: sanityHeaderOfferText(
        _id: { eq: "9bae3ed0-04ce-4437-88cc-f2c759a8f489" }
      ) {
        overview {
          children {
            text
          }
        }
      }
    }
  `)

  return {
    offer: offerData,
  }
}
export default Offertext
