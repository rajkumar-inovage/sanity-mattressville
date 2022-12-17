import React from 'react'

const GiftMobile = props => {
  const { height, width, className, style } = props
  return (
    <svg
      xmlns={'//www.w3.org/2000/svg'}
      viewBox={'0 0 26 26'}
      fill={'none'}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      <path
        d="M16.4338 10.4289L23.2272 3.63545M23.2272 3.63545L19.8934 3.69835M23.2272 3.63545L23.1643 6.96926"
        stroke="#3E3E3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4289 10.429L3.63545 3.63554M3.63545 3.63554L3.69835 6.96935M3.63545 3.63554L6.96926 3.69845"
        stroke="#3E3E3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4294 16.4344L3.63603 23.2278M3.63603 23.2278L6.96984 23.1649M3.63603 23.2278L3.69893 19.894"
        stroke="#3E3E3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4344 16.4343L23.2278 23.2277M23.2278 23.2277L23.1649 19.8939M23.2278 23.2277L19.894 23.1648"
        stroke="#3E3E3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default GiftMobile
