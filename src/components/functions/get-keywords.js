const getKeywords = tags =>
  tags
    .filter(tag => tag.includes('keyword-'))
    .map(tag => tag.replace('keyword-', ''))

export default getKeywords
