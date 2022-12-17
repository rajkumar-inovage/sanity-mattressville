const getCouponCode = Tags => {
  const CouponCode = Tags.filter(tag => {
    return tag.includes('Code-')
  }).pop()
  return CouponCode ? CouponCode.replace('Code-', '') : false
}

export default getCouponCode
