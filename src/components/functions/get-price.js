const GetPrice = (price, fractionDigits = 0) => {
  return Intl.NumberFormat('en-CA', {
    currency: 'CAD',
    minimumFractionDigits: fractionDigits,
    style: 'currency',
  }).format(parseFloat(price ? price : 0))
}

export default GetPrice
