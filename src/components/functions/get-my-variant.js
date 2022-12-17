const getMyVariant = (variants, searchVariant) => {
  if (variants && variants.edges) {
    const myVariant = variants.edges.find(({ node: { selectedOptions } }) => {
      return selectedOptions.find(({ name, value }) => {
        return (
          name === 'Size' && value.toLowerCase() === searchVariant.toLowerCase()
        )
      })
    })
    return myVariant ? myVariant : null
  } else {
    return null
  }
}
module.exports = getMyVariant
