import { graphql, useStaticQuery } from 'gatsby'

const MattressMatchmakerData = () => {
  const {
    q1_o1,
    q1_o2,
    q1_o3,
    q2_o1,
    q2_o2,
    q2_o3,
    q2_o4,
    q3_o1,
    q3_o2,
    q3_o3,
    q3_o4,
    q4_o1,
    q4_o2,
  } = useStaticQuery(graphql`
    {
      q1_o1: file(relativePath: { eq: "q1o1.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q1_o2: file(relativePath: { eq: "q1o2.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q1_o3: file(relativePath: { eq: "q1o3.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q2_o1: file(relativePath: { eq: "q2o1.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q2_o2: file(relativePath: { eq: "q2o2.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q2_o3: file(relativePath: { eq: "q2o3.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q2_o4: file(relativePath: { eq: "q2o4.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q3_o1: file(relativePath: { eq: "q2o1.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q3_o2: file(relativePath: { eq: "q3o2.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q3_o3: file(relativePath: { eq: "q3o3.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q3_o4: file(relativePath: { eq: "q3o4.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q4_o1: file(relativePath: { eq: "q4o1.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      q4_o2: file(relativePath: { eq: "q4o2.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
    }
  `)

  return {
    seo: {
      title: `Mattress Matchmaker`,
      description: `Check out the Mattress Matchmaker from Mattressville to choose the best mattress for your comfort. Get the best deals on all bed sets. Click to buy now!`,
      ogPath: '/mattress-matchmaker/',
    },
    toolData: {
      toolTitle: 'Mattress Matchmaker',
      subTitle: 'Let’s find your perfect mattress!',
      subDesc:
        'Answer the following questions about your sleeping preferences so we can get your best match.',
      quiz: [
        {
          question: 'In what position do you most comfortably sleep?',
          layout: 'vertical',
          optionLayout: 1, // image-label-horizontal
          options: [
            {
              image: q1_o1,
              label: 'ON YOUR SIDE',
              tagValue: 'On Your Side',
              alt: `A pink colored vector image of a pillow and a human sleeping on it sideways.
              `,
            },
            {
              image: q1_o2,
              label: 'ON YOUR BACK/STOMACH',
              tagValue: 'On Your Back',
              alt: `A pink colored vector image of a pillow and a human sleeping on it.
              `,
            },
            {
              image: q1_o3,
              label: 'ALL OVER THE PLACE',
              tagValue: 'Toss and Turn',
              alt: `A pink colored vector image of a pillow and a human sleeping on it.
              `,
            },
          ],
        },
        {
          question: 'What’s your preferred mattress comfort level?',
          layout: 'grid',
          optionLayout: 1, // image-label-horizontal
          options: [
            {
              image: q2_o1,
              label: 'SOFT',
              tagValue: 'Soft',
              alt: `A pink colored vector image of a human sleeping but a pillow in his hand.
              `,
            },
            {
              image: q2_o2,
              label: 'MEDIUM',
              tagValue: 'Medium',
              alt: `A pink colored vector image of a pillow and a human sleeping on it.
              `,
            },
            {
              image: q2_o3,
              label: 'FIRM',
              tagValue: 'Firm',
              alt: `A pink colored vector image of a pillow and a human sleeping on it.
              `,
            },
            {
              image: q2_o4,
              label: 'EXTRA FIRM',
              tagValue: 'Extra Firm',
              alt: `A pink colored vector image of a pillow and a human sleeping on it.
              `,
            },
          ],
        },
        {
          question: 'What is your body type?',
          layout: 'grid',
          optionLayout: 2, // label-image-desc-vertical
          options: [
            {
              image: q3_o1,
              label: 'SMALL',
              desc: 'Typically under 130lbs.',
              tagValue: 'Small',
              alt: `A pink colored vector image of a hum sleeping but a pillow in his hand.
              `,
            },
            {
              image: q3_o2,
              label: 'AVERAGE',
              desc: 'Between 130lbs and 210lbs.',
              tagValue: 'Average',
              alt: `A pink colored vector image of a pillow and a human sleeping on it.
              `,
            },
            {
              image: q3_o3,
              label: 'LARGE',
              desc: 'Between 210lbs and 280lbs.',
              tagValue: 'Large',
              alt: `A pink colored vector image of a pillow and a human sleeping on it.
              `,
            },
            {
              image: q3_o4,
              label: 'EXTRA LARGE',
              desc: 'Over 280lbs.',
              tagValue: 'Extra Large',
              alt: `A pink colored vector image of a pillow and a human sleeping on it.
              `,
            },
          ],
        },
        {
          question: 'What type of mattress are you interested in?',
          layout: 'vertical-full',
          optionLayout: 3, // image-label-up-desc-below
          options: [
            {
              image: q4_o1,
              label: 'FOAM CORE MATTRESS',
              desc: 'Special bedding is made with the newest in mattress technology including specialty longer lasting foams, innovative cooling systems and advanced pressure relief systems which help eliminate back pain and provide the best sleep possible.',
              tagValue: 'Modern',
              alt: `Foam core mattress.
              `,
            },
            {
              image: q4_o2,
              label: 'TRADITIONAL INNERSPRING MATTRESS',
              desc: `Mattress technologies have come a long way in the past decade and most good quality innerspring mattresses now provide advanced back support and quality materials for a comfortable night's sleep.`,
              tagValue: 'Traditional',
              alt: `Traditional innerspring mattress.
              `,
            },
          ],
        },
      ],
    },
  }
}

export default MattressMatchmakerData
