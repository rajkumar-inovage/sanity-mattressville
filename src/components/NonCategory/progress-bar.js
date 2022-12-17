import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

const ProgressBar = ({ progress }) => {
  return (
    <div className={'progress-wrapper'}>
      <CircularProgressbar
        value={progress}
        text={null}
        strokeWidth={4}
        counterClockwise
        styles={{
          path: {
            stroke: `#ff5c7b`,
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 0.5s ease 0s',
          },
          trail: {
            stroke: '#535353',
            strokeLinecap: 'round',
          },
          text: {
            fill: '#535353',
            dominantBaseline: 'middle',
            textAnchor: 'middle',
          },
          background: { fill: '#3e98c7' },
        }}
      />
      <div className={'label'}>
        <span>
          <strong>{progress}</strong>
          <small>%</small>
        </span>
      </div>
    </div>
  )
}

export default ProgressBar
