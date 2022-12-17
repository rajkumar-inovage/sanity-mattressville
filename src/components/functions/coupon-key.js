const getCouponKey = Tags => {
  const CouponKey = Tags.filter(tag => {
    return tag.includes('Key-')
  }).pop()
  return CouponKey ? CouponKey.replace('Key-', '').toLowerCase(): false
}

export default getCouponKey
