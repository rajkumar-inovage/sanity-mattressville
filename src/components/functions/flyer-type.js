const getFlyerType = Tags => {
  return Tags.includes('GTA') ? 'GTA' : Tags.includes('CW') ? 'CW' : null
}

export default getFlyerType
