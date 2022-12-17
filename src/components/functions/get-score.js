const getScore = productTags => {
  if (productTags.includes('Extra Firm')) {
    return 4
  } else if (productTags.includes('Firm')) {
    return 3
  } else if (productTags.includes('Medium')) {
    return 2
  } else if (productTags.includes('Soft')) {
    return 1
  } else {
    return 0
  }
}

export default getScore
