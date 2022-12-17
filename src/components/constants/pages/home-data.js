import { graphql, useStaticQuery } from 'gatsby'

const HomeData = () => {
  const {
    allMattresses,
    clearance,
    deals,
    bannerSlide1,
    bannerSlide2,
    bannerSlide3,
    bannerSlide4,
    bed,
    bedLg,
    gift,
    giftLg,
    mattressInBox,
    bedframes,
    furniture,
    pillows,
    beauty,
    mville,
    iComfort,
    galaxyBedding,
    sealy,
    tempur,
    kingsdown,
    natura,
    serta,
    sf,
    testimonialBg,
    support,
    online,
    delivery,
    shield,
    storeData: {
      homeSlider: {
        edges: [
          {
            node: {
              sliderData: { slides }
            }
          }
        ]
      },
      trendingProductsData,
      todaysDeal
    }
  } = useStaticQuery(graphql`
    {
      allMattresses: file(relativePath: { eq: "mattressville_view_all_small.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      clearance: file(relativePath: { eq: "mattressville_clearance_small.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      deals: file(relativePath: { eq: "mattressville_flash_deals_small.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      bannerSlide1: file(relativePath: { eq: "mattressville_banner_1.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            width: 930
          )
        }
      }
      bannerSlide2: file(relativePath: { eq: "mattressville_banner_2.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            width: 930
          )
        }
      }
      bannerSlide3: file(relativePath: { eq: "mattressville_banner_3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            width: 930
          )
        }
      }
      bannerSlide4: file(relativePath: { eq: "mattressville_banner_4.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            width: 930
          )
        }
      }
      bed: file(relativePath: { eq: "bed.png" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      bedLg: file(relativePath: { eq: "bed-lg.png" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      gift: file(relativePath: { eq: "gift.png" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      giftLg: file(relativePath: { eq: "gift-lg.png" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      mattressInBox: file(relativePath: { eq: "category1.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      bedframes: file(relativePath: { eq: "category2.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      furniture: file(relativePath: { eq: "category3.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      pillows: file(relativePath: { eq: "category4.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      beauty: file(relativePath: { eq: "beauty.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      mville: file(relativePath: { eq: "mville-new.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      iComfort: file(relativePath: { eq: "iComfort.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      galaxyBedding: file(relativePath: { eq: "galaxy.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      sealy: file(relativePath: { eq: "sealy.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      tempur: file(relativePath: { eq: "tempur.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      kingsdown: file(relativePath: { eq: "kingsdown.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      natura: file(relativePath: { eq: "natura.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      serta: file(relativePath: { eq: "serta.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      sf: file(relativePath: { eq: "sf.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            height: 55
          )
        }
      }
      testimonialBg: file(relativePath: { eq: "girl.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: DOMINANT_COLOR)
        }
      }
      support: file(relativePath: { eq: "support.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            width: 52
            height: 52
          )
        }
      }
      online: file(relativePath: { eq: "online.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            width: 52
            height: 52
          )
        }
      }
      delivery: file(relativePath: { eq: "delivery.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            width: 52
            height: 52
          )
        }
      }
      shield: file(relativePath: { eq: "shield.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: WEBP
            placeholder: DOMINANT_COLOR
            width: 52
            height: 52
          )
        }
      }
      storeData: store {
        homeSlider: blogs(query: "handle:home-slider", first: 1) {
          edges {
            node {
              sliderData: articles(first: 250, sortKey: PUBLISHED_AT) {
                slides: edges {
                  data: node {
                    link: title
                    title: content
                    image {
                      url
                      localImage {
                        childImageSharp {
                          gatsbyImageData(
                            quality: 100
                            formats: NO_CHANGE
                            placeholder: DOMINANT_COLOR
                          )
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        trendingProductsData: products(
          first: 250
          sortKey: CREATED_AT
          reverse: true
          query: "tag:'Trending'"
        ) {
          products: edges {
            product: node {
              handle
              title
              tags
              createdAt
              publishedAt
              productType
              vendor
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
              softness_score: metafield(
                key: "softness_score"
                namespace: "meta_data"
              ) {
                value
              }
              origin: metafield(key: "origin", namespace: "meta_data") {
                value
              }
              shipping_areas: metafield(
                key: "shipping_areas"
                namespace: "meta_data"
              ) {
                value
              }
              card_features: metafield(
                key: "card_features"
                namespace: "meta_data"
              ) {
                value
              }
              images(first: 25) {
                edges {
                  node {
                    url
                    localImage {
                      childImageSharp {
                        gatsbyImageData(
                          formats: WEBP
                          placeholder: DOMINANT_COLOR
                          width: 335
                          height: 170
                          transformOptions: { cropFocus: CENTER, fit: CONTAIN }
                        )
                      }
                    }
                  }
                }
              }
              variants(first: 250) {
                edges {
                  node {
                    title
                    priceV2 {
                      amount
                    }
                    compareAtPriceV2 {
                      amount
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
        todaysDeal: products(
          first: 4
          sortKey: CREATED_AT
          reverse: true
          query: "tag:'Flash Deals'"
        ) {
          products: edges {
            product: node {
              handle
              title
              tags
              createdAt
              publishedAt
              productType
              vendor
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
              softness_score: metafield(
                key: "softness_score"
                namespace: "meta_data"
              ) {
                value
              }
              origin: metafield(key: "origin", namespace: "meta_data") {
                value
              }
              shipping_areas: metafield(
                key: "shipping_areas"
                namespace: "meta_data"
              ) {
                value
              }
              card_features: metafield(
                key: "card_features"
                namespace: "meta_data"
              ) {
                value
              }
              images(first: 25) {
                edges {
                  node {
                    url
                    localImage {
                      childImageSharp {
                        gatsbyImageData(
                          formats: WEBP
                          placeholder: DOMINANT_COLOR
                          width: 335
                          height: 170
                          transformOptions: { cropFocus: CENTER }
                        )
                      }
                    }
                  }
                }
              }
              variants(first: 250) {
                edges {
                  node {
                    title
                    priceV2 {
                      amount
                    }
                    compareAtPriceV2 {
                      amount
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return {
    seo: {
      title: `Highest Rated Mattress Store in Mississauga near Toronto`,
      description: `Mattressville is your one stop shop for premium mattresses and sleep accessories so you can Have a Good Night, Every Night! Shop online or visit in Mississauga near Toronto.`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Mattressville | Highest Rated Mattress Store in Mississauga near Toronto',
        '@id': '',
        url: 'https://mattressville.ca',
        telephone: '905-212-7722',
        priceRange: '$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1911 Dundas St. East, Unit 18',
          addressLocality: 'Mississauga',
          addressRegion: 'ON',
          postalCode: 'L4X 1M1',
          addressCountry: 'CA'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.6209,
          longitude: -79.572548
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          opens: '11:00',
          closes: '18:00'
        },
        sameAs: [
          'https://www.facebook.com/mattressville',
          'https://twitter.com/mattressville1',
          'https://www.instagram.com/mattressvilleca/'
        ]
      }
    },
    hero: {
      bed,
      bedLg,
      gift,
      giftLg,
      heroSlider: [
        {
          link: `/brands/beautyrest/`,
          image: beauty
        },
        {
          link: `/brands/mattressville/`,
          image: mville
        },
        {
          link: `/brands/galaxy-bedding/`,
          image: galaxyBedding
        },
        {
          link: `/brands/serta-icomfort/`,
          image: iComfort
        },
        {
          link: `/brands/kingsdown/`,
          image: kingsdown
        },
        {
          link: `/brands/natura/`,
          image: natura
        },
        { link: `/brands/sealy/`, image: sealy },
        {
          link: `/brands/serta/`,
          image: serta
        },
        {
          link: `/brands/stearns-and-foster/`,
          image: sf
        },
        {
          link: `/brands/tempur-pedic/`,
          image: tempur
        }
      ],
      bannerSlider: slides.map(({ data: { image, link, title } }) => {
        return {
          image,
          link,
          title
        }
      }),
      bannerSliderOld: [
        {
          link: `/all-mattresses/`,
          image: bannerSlide1
        },
        {
          link: `/brands/beautyrest/`,
          image: bannerSlide2
        },
        {
          link: `/brands/beautyrest/`,
          image: bannerSlide3
        },
        {
          link: `/brands/stearns-and-foster/`,
          image: bannerSlide4
        }
      ],
      categoryHeader: {
        title: `Shop By Categories`,
        exploreLink: `/all-mattresses/`
      },
      categorySlider: [
        {
          link: `/all-mattresses/mattress-in-a-box/`,
          image: mattressInBox,
          title: `Mattress In a Box`
        },
        {
          link: `/all-mattresses/memory-foam/`,
          image: bedframes,
          title: `Memory Foam Mattresses`
        },
        {
          link: `/accessories/adjustable-beds/`,
          image: furniture,
          title: `Adjustable Bed Bases`
        },
        {
          link: `/all-mattresses/mattresses-under-500/`,
          image: pillows,
          title: `Mattresses Under $500`
        }
      ]
    },
    trending: {
      title: `Trending Products`,
      explore: {
        label: `Explore more`,
        link: `/all-mattresses/clearance/`
      },
      productsData: trendingProductsData
    },
    salesNDealsSection: {
      allMattresses,
      clearance,
      deals
    },
    deals: {
      title: `Today’s Deals`,
      explore: {
        label: `Explore more`,
        link: `/all-mattresses/flash-deals/`
      },
      todaysDeal: todaysDeal
    },
    offerData: {
      title: `Mattressville`,
      subscribeText: `Subscribe to our newsletter and enjoy`,
      discount: `10% OFF`,
      placeholderFname: `Enter First Name`,
      placeholderLname: `Enter Last Name`,
      placeholder: `Enter your email address`,
      btnText: `SUBSCRIBE`
    },
    
    testimonials: {
      mobtitle1: `What Our`,
      mobtitle2: `Customers are Saying`,
      title: `What Our Customers are Saying`,
      bgImage: testimonialBg,
      bgAltText: `A women sleeping on a white bed and white cozy mattress`,
      customerSay: [
        {
          title: `Best Customer Support`,
          desc: `<p>
                      The sales person Andrew was excellent. He knew his products well and helped us choosing what we needed. The delivery service was smooth as well. Was overall a great experience.
                  </p>`,
          reviewers: `June Graham`,
          icon: support
        },
        {
          title: `Easy Online Shopping Experience`,
          desc: `<p>
                      I received excellent service from Alex both pre sale and
                      after sale. My purchase was done online and Alex follow up
                      with a call. The delivery guys were also very professional
                      and courteous. Highly recommend!!
                  </p>`,
          reviewers: `Vincent S.`,
          icon: online
        },
        {
          title: `Free Delivery`,
          subtitle: `<p>On Orders Over $499</p>`,
          desc: `<p>
                      My husband and I decided to check this place based on the
                      positive reviews. I am glad we did... The service was
                      exceptional. The salesperson was very honest and
                      knowledgeable. No additional charge for delivery which is
                      another plus.... Best mattress store in town."
                    </p>`,
          reviewers: `Five Star Moulding Company`,
          icon: delivery
        },
        {
          title: `Biggest Brand Names`,
          desc: `<p>
                      Great place to buy brand name mattresses. You can choose
                      from high end Stearns and Foster, Tempurpedic, Beautyrest
                      Black, to mid range Sealy, Simmons and some good local
                      brands. They deliver to all major cities.... Definitely
                      recommend. Great service and prices."
                    </p>`,
          reviewers: `-Valeriya Budakovska`,
          icon: shield
        }
      ]
    }
  }
}

export default HomeData
