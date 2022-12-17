const CategoryPageData = () => {
  return {
    seoData: {
      title: `Product Category`,
      description: `Mattressville provides the best all-around mattress at great discounts. Buy online from our wide selection of mattresses for sale &amp; enjoy free delivery. Call us!`,
      schema: {
        '@context': 'http://schema.org',
        '@type': 'CollectionPage',
        name: 'Shopify Apps',
        url: 'https://sherpas.design/pages/shopify-apps',
        description: 'We build apps that function and feel natively Shopify',
        image:
          'https://cdn.shopify.com/s/files/1/0085/8515/0560/files/logox2_500x500.png?v=1555661781',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              url: 'http://example.com/coffee_cake.html',
            },
            {
              '@type': 'ListItem',
              position: 2,
              url: 'http://example.com/apple_pie.html',
            },
            {
              '@type': 'ListItem',
              position: 3,
              url: 'http://example.com/blueberry-pie.html',
            },
          ],
        },
      },
      a: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Product Category',
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
          addressCountry: 'CA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.6209,
          longitude: -79.572548,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '11:00',
          closes: '18:00',
        },
        sameAs: [
          'https://www.facebook.com/mattressville',
          'https://twitter.com/mattressville1',
          'https://www.instagram.com/mattressvilleca/',
        ],
      },
    },
  }
}

export default CategoryPageData
