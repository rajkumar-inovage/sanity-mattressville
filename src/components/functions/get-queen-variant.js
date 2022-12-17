const getQueenVariant = variants => {
  if (variants && variants.edges) {
    const queenVariant = variants.edges.find(
      ({ node: { selectedOptions } }) => {
        return selectedOptions.find(({ name, value }) => {
          return (
            name === 'Size' && value.toLowerCase() === 'QUEEN'.toLowerCase()
          )
        })
      }
    )
    return queenVariant ? queenVariant : null
  } else {
    return null
  }
}
module.exports = getQueenVariant
