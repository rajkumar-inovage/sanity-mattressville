const parseBool = v => {
  if (v === '1') return true
  if (v === '0') return false
  if (typeof v === 'undefined') return false
  if (v === null) return false
  return v === 'true'
}
module.exports = parseBool
