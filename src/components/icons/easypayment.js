import React from 'react'

const EasyPayment = ({ height, width, className, fillColor = '#08af97' }) => {
  return (
    <svg
      xmlns={'//www.w3.org/2000/svg'}
      viewBox={'0 0 51 60'}
      fill={'none'}
      width={width}
      height={height}
      className={className}
    >
      <path
        d={
          'M25.4 20.5v7.1c0 1.3 1.2 1.8 2.4 1.3l22.5-13c1.1-.6 1-2.1 0-2.6L27.8.2c-1-.6-2.2.1-2.2 1.3v7.1C11.3 8.7.1 17.7.1 32.7c0 14.5 10.4 23.3 24 24.1v-3.9C15.2 52.2 8 46.5 8 36.9c-.4-10.5 7.8-16.2 17.4-16.4zm4.8 28.1c.8 2.4 2.5 3.6 5 3.6 1.8 0 4.3-.8 4.3-3.1 0-2.5-3.9-3.1-5.7-3.5-3.9-1-7.9-2.9-7.9-7.5 0-4.2 3.6-6.4 7.4-7v-2.8h3.6v2.8c3.3.4 6.1 2.2 7.2 5.9l-5 1.4c-.7-2.2-2.1-2.9-4.3-2.9-1.3 0-3.6.6-3.6 2.2 0 2.1 3.3 2.6 4.9 3.1 4.4 1.1 9.2 2.9 9.2 8.4 0 4.9-4 7.3-8.3 7.8v3.1h-3.7V57c-3.7-.6-7.1-2.9-8.1-7l5-1.4z'
        }
        fillRule={'evenodd'}
        clipRule={'evenodd'}
        fill={fillColor}
      />
    </svg>
  )
}
export default EasyPayment
