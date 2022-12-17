import { graphql, useStaticQuery } from 'gatsby'

const WhyMattressvilleData = () => {
  const { NonCategoryBannerImage, mattressVille } = useStaticQuery(graphql`
    {
      NonCategoryBannerImage: file(relativePath: { eq: "NonCategory.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      mattressVille: file(relativePath: { eq: "mattressville-slogan.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 45
          )
        }
      }
    }
  `)
  return {
    seoData: {
      title: `Why You Should Buy Your Mattress From Mattressville`,
      description: `Mattressville is the best mattress store in the Greater Toronto Area. We offer premium mattresses available in all sizes & styles. Shop online today!`,
      ogPath: '/why-mattressville/',
    },
    mainData: {
      bannerSection: {
        title: `Why Mattressville`,
        NonCategoryBannerImage,
        altText: `An image of a bed with white mattress, white pillows and beige colored cusion`,
        description: `<span class="bold">At Mattressville, we take pride in stocking some of the best mattress brands in the industry in all sizes, styles, and firmness levels.</span> Whether you're looking for a standard or custom sized mattress, a memory foam or pillow top, we have something for you. On top of that, we also offer quick delivery times so you can start enjoying quality sleep sooner.`,
      },
      iconSet: {
        icon1: ``,
        text1: `<strong>No traditional retail prices</strong> when shopping with us, we buy in bulk direct from the factory and maintain low overhead costs.`,
        icon2: ``,
        text2: `Non-commissioned, friendly and knowledgeable <strong>Sleep Consultants will help you select the perfect mattress.</strong>`,
        icon3: ``,
        text3: `<strong>No costly retail space</strong>, fancy showrooms, high administrative costs, or expensive advertising budgets.`,
        icon4: ``,
        text4: `<strong>Awesome referral rewards program,</strong> as well as the best deals & offers.`,
      },
      qualityMattressBrand: {
        title: `Quality Mattress Brands`,
        description: `<span class="bold">When it comes to mattresses, no-name or generic brands are not the same as well recognized name ones.</span> Generic brands have none of the patented features and their components and quality are not the same as the name brand.`,
        cards: {
          cardTitle1: `Stearns & Foster`,
          cardDescription1: `Stearns and Foster was established in 1846 and has been this nation's luxury brand for many years. The upholstery materials used in S&F products are usually the best available. Durability and comfort have long been the reputation of this brand. Looking for a Stearns & Foster Mattress Sale? Check our deals now`,
          cardLinkText1: `View Stearns & Foster products`,
          cardLink1: `/brands/stearns-and-foster/`,
          cardTitle2: `BEAUTYREST`,
          cardDescription2: `Sleep is more than a necessity and a mattress should represent something more than the utility. Beautyrest Black® is where technology and luxury intertwine to take you far beyond mere comfort. It's about sleep that indulges the senses. Sleep that refuses to compromise. Sleep that's so completely restorative and inspiring, it borders on the sacred.`,
          cardLinkText2: `View Beautyrest products`,
          cardLink2: `/brands/beautyrest/`,
          cardTitle3: `TEMPUR-PEDIC`,
          cardDescription3: `<span style="font-weight:bold;">Tempur-Pedic® mattresses are designed to help you relax and sleep better. </span>It is more than a typical memory foam mattress. TEMPUR® material is not typical memory foam. Their proprietary formulation changed the way the world sleeps.`,
          cardLinkText3: `View Tempur-Pedic products`,
          cardLink3: `/brands/tempur-pedic/`,
          cardTitle4: `SEALY`,
          cardDescription4: `Since 1881, Sealy has built mattresses that focus on support, comfort, and value. Sealy Posturepedic mattresses are designed to give you the rest you need to wake up renewed, refreshed, and ready to face your day.`,
          cardLinkText4: `View Sealy products`,
          cardLink4: `/brands/sealy/`,
        },
      },
      faq: {
        title: `Frequently Asked Questions`,
        qus1: `Full Manufacturer Warranty`,
        ans1: `Purchasing a new mattress is an investment, and you should have peace of mind that your investment is protected — that’s why all of our mattresses come with a full manufacturer warranty. This means that if you ever have an issue with your new mattress in the future, you can contact us and we will guide you through the warranty process. Our exceptional after-sales service team works tirelessly to make the warranty process as simple and easy as possible, so you can shop at Mattressville with confidence.`,
        qus2: `Sleep Guarantee`,
        ans2: `It's not uncommon for customers to test out a mattress at the store for a few minutes, purchase it with the expectation that it will satisfy their needs, and then after some time, realize that it's too soft or too firm. We understand that the few minutes you get to test out a mattress in-store may not be a good indicator of whether your choice will be right for you in the long-term — and that's where our Comfort Guarantee comes in. A comfortable bed is key to getting a good night's sleep. Our Comfort Guarantee is offered to underline our commitment to providing a great night's sleep. The Comfort Guarantee allows for the replacement of a mattress if you find your original purchase to be of the wrong comfort level. Although it rarely happens that our customers are unsatisfied with their new mattress purchase, we are so confident in our range of quality mattresses that we're willing to give you a couple of months to try out your selection. If you feel at any point that you're not getting the best night's sleep with your new mattress, you can contact us to arrange an exchange for a new mattress.`,
        qus3: `Price Match Guarantee`,
        ans3: `One of the things you'll discover when shopping with Mattressville is that our products are always priced below what you'll find retail stores. In fact, we're so confident you won't find a better price anywhere else that we offer a 'Price Match Guarantee.' We will beat any competitor's price by 5%, so you can shop with peace of mind.`,
        qus4: `Mattress Sleep Experts`,
        ans4: `When you make the decision to get a new mattress it may seem like all of them are the same, with differences only in size and thickness. However, not all mattresses are created equal — there are different types and sizes of mattresses, made from different materials, and constructed using different materials. The key to getting quality sleep is finding the mattress that best suits your sleep style and sleep needs. Our non-commissioned, friendly, highly professional and knowledgeable Sleep Consultants can help you select the perfect mattress with no pressure.`,
        qus5: `Referral Program`,
        ans5: `With your Mattressville referral program account, you will be provided with a unique discount link that you can share with your friends to enjoy a number of benefits from us. Our referral program also gives you an opportunity to receive extra cash, free presents, additional discounts or store credit for your future purchases. Contact us online today for more details or give us a call at (888) 841 0905!`,
      },
      reasonablePrices: {
        title: `Reasonable Prices, Best Quality`,
        description: `<span class="bold">Alluring and cheap outlet store prices can lead to spending more down the line, while the average Big Box Store prices are usually inflated.</span> Here at Mattressville, we aim to provide you the premium sleeping experience with brand name mattresses at fair and competitive prices without compromising on quality.`,
        retailers: {
          title: `BIG BOX RETAILERS`,
          item1: `Huge Price/Good Quality`,
          item2: `Brand Name Products`,
          item3: `Fully Manufacturer Warranty`,
          item4: `Sleep Guarantee`,
          item5: `Price Match Guarantee`,
          item6: `Mattress/ Sleep Experts`,
          item7: `Referral Program`,
        },
        mattressVille: {
          logo: mattressVille,
          item1: `Reasonable Price/Good Quality`,
          item2: `Brand Name Products`,
          item3: `Fully Manufacturer Warranty`,
          item4: `Sleep Guarantee`,
          item5: `Price Match Guarantee`,
          item6: `Mattress/ Sleep Experts`,
          item7: `Referral Program`,
          btnText: `SHOP NOW`,
          btnLink: `/all-mattresses/`,
        },
        outletStores: {
          title: `OUTLET STORES`,
          item1: `Cheap Price/Poor Quality`,
          item2: `Usually no Brand Name Products`,
          item3: `Difficult Warranty`,
          item4: `Sleep Guarantee`,
          item5: `Price Match Guarantee`,
          item6: `Mattress/ Sleep Experts`,
          item7: `Referral Program`,
        },
      },
      businessStrategy: {
        title: `Our Business Strategy`,
        card: {
          cardTitle1: `<span class="bold">No</span> Expensive Showroom`,
          cardDescription1: `We keep our rent cost low with No Prime Retail Locatrion and space saving design. It allow us to save and evaluate our product prices without hidden or extra costs.`,
          progress1: `25`,
          cardTitle2: `<span class="bold">Low</span> Administrative Cost`,
          cardDescription2: `We use only necessary administrative expenses, implementing different saving strategies that significantly allow us to cut out business costs.`,
          progress2: `13`,
          cardTitle3: `<span class="bold">Non-Commisioned</span> Staff`,
          cardDescription3: `Non-commisioned sales approach helps to alleviate the pressure typical mattress sales can place upon the customer. Our Friendly Sleep Consultants work to make your mattress buying experience as comfortable and pleasant as possible.`,
          progress3: `10`,
          cardTitle4: `<span class="bold">Bulk</span> Buying Power`,
          cardDescription4: `We are always on the lookout for exceptional mattress deals and promotions from our suppliers. We buy in bulk and negotiate the lowest prices and then pass all the savings directly on to you. We utilize our buying power to offer the best price for brand nan mattresses.`,
          progress4: `17`,
        },
      },
      totalSaving: {
        boldTitle: `Total`,
        thinTitle: `Savings`,
        progress: `55`,
      },
    },
  }
}

export default WhyMattressvilleData
