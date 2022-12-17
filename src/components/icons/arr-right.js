import React from 'react'

const ArrRight = props => {
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
        d={'M0.999999 6.5L25 6.5M25 6.5L19 1M25 6.5L19 12'}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  )
}
export default ArrRight
