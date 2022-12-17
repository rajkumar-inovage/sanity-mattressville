import React, { Fragment } from 'react'

import Seo from '~/components/seo'
import HomeData from '~/components/constants/pages/home-data'
import Hero from '~/components/Hero'
import TrendingProducts from '~/components/TrendingProducts'
import SalesNDeals from '~/components/Sales_N_Deals'
import TodaysDeal from '~/components/TodaysDeal'
import Offer from '~/components/Offer'
import Testimonials from '~/components/Testimonials'

const IndexPage = () => {
  const {
      seo,
      hero,
      trending,
      salesNDealsSection,
      deals,
      offerData,
      testimonials,
    } = HomeData(),
    { title, description, schema } = seo

  return (
    <Fragment>
      <Seo
        title={title.length > 40 ? `${title.slice(0, 40)}...` : title}
        description={description}
        schemaMarkup={schema}
        titleAfter={true}
      />
      <h1
        style={{
          appearance: 'none',
          width: 0,
          height: 0,
          marginBottom: 0,
          opacity: 0,
        }}
      >
        {title}
      </h1>
      <Hero data={hero} />
      <TrendingProducts data={trending} />
      <SalesNDeals data={salesNDealsSection} />
      <TodaysDeal data={deals} />
      <Offer data={offerData} />
      <Testimonials data={testimonials} />
    </Fragment>
  )
}

export default IndexPage
