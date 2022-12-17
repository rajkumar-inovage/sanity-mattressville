/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import React from 'react'

export default ({ icon, extraClass, style }) => {
  return (
    <i
      className={`gsi ${icon}${extraClass ? ` ${extraClass}` : ''}`}
      style={style}
    />
  )
}
