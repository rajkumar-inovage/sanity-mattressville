const generatePassword = (
  length = 10,
  alphabets = 'abcdefghijklmnopqrstuvwxyz',
  numbers = '0123456789',
  specials = '!@#$%^&*()_+~`|}{[]:;?><,./-='
) => {
  const charset = [alphabets, alphabets.toUpperCase(), numbers, specials].join(
    ''
  )
  let retVal = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

export default generatePassword
