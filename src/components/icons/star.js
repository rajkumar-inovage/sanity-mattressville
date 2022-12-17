import React from 'react'

const Star = props => {
  const { height, width, className, style } = props
  return (
    <svg
      xmlns={'//www.w3.org/2000/svg'}
      viewBox={'0 0 24 24'}
      fill={'none'}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      <path
        fillRule={'evenodd'}
        clipRule={'evenodd'}
        d={
          'M11.9992 19.4142L5.6346 22.81C4.75605 23.2787 4.18215 22.8676 4.35363 21.8868L5.60243 14.7438L0.418105 9.70637C-0.29485 9.01363 -0.0735007 8.33865 0.910558 8.19905L8.04576 7.1868L11.2134 0.670345C11.6473 -0.222447 12.35 -0.224449 12.7849 0.670345L15.9525 7.1868L23.0878 8.19905C24.0727 8.33877 24.2965 9.01039 23.5802 9.70637L18.3959 14.7438L19.6447 21.8868C19.8158 22.8654 19.2415 23.2783 18.3637 22.81L11.9992 19.4142Z'
        }
        fill={'#FBCA23'}
      />
    </svg>
  )
}
export default Star
