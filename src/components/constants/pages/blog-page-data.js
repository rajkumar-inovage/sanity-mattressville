import { graphql, useStaticQuery } from 'gatsby'

const BlogPageData = () => {
  const { ctaImage, blogBanner } = useStaticQuery(graphql`
    {
      ctaImage: file(relativePath: { eq: "cta-image.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            width: 190
            height: 110
          )
        }
      }
      blogBanner: file(relativePath: { eq: "mattressville_blog.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:375
          )
        }
      }
    }
  `)
  return {
    mainData: {
      blogBannerImage: blogBanner,
      blogBannerAlt:
        'blog, woman smiling while sitting and holding a mug with a laptop on her legs',
    },
    seoData: {
      title: `Blog`,
      description: `Our blog help you find the right mattress & get a better night's sleep without spending more than you have to. Read on!`,
      ogImage: `/img/blog-og.jpg`,
    },
    iconData: {
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
    ctaData: {
      leftArea: {
        image: ctaImage,
        link: `/all-mattresses/`,
        label: `Shop All Mattresses`,
        alt: `A pile of white mattresses`,
      },
      rightArea: {
        label: `Try our`,
        secondLabel: `Mattress Matchmaker`,
        link: `/mattress-matchmaker/`,
      },
    },
  }
}

export default BlogPageData
