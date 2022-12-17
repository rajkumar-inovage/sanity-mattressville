const getCouponExpiry = Tags => {
  const CouponExpiry = Tags.filter(tag => {
    return tag.includes('Expiry-')
  }).pop()
  return CouponExpiry ? CouponExpiry.replace('Expiry-', '') : false
}

export default getCouponExpiry
