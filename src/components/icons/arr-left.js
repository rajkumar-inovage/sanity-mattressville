import React from 'react'

const ArrLeft = props => {
  const { height, width, className, style, stroke } = props
  return (
    <svg
      xmlns={'//www.w3.org/2000/svg'}
      viewBox={'0 0 26 13'}
      fill={'none'}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      <path
        d={'M25 6.5L1 6.5M1 6.5L7 1M1 6.5L7 12'}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  )
}
export default ArrLeft
