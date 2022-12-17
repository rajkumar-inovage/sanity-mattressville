const getProductLocation = productTags => {
  if (productTags.includes('Mattress-In-A-Box')) {
    return {
      city: 'Mississauga',
      fullCountry: true,
    }
  } else {
    return {
      city: 'Mississauga',
      fullCountry: false,
    }
  }
}

export default getProductLocation
