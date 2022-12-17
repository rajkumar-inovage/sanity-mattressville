const getCouponLink = Tags => {
  const CouponLink = Tags.filter(tag => {
    return tag.includes('Link-')
  }).pop()
  return CouponLink ? CouponLink.replace('Link-', '') : '/all-mattresses/'
}

export default getCouponLink
