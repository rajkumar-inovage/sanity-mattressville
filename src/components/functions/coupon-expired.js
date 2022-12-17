const isCouponExpired = ExpiryDate => {
  if (ExpiryDate) {
    const today = new Date(),
      expiry = new Date(ExpiryDate)
    return today.getTime() > expiry.getTime()
  } else {
    return false
  }
}

export default isCouponExpired
