import React from 'react'

const Loader = () => {
  return (
    <div className={'d-flex align-items-center justify-content-center vh-100'}>
      <div
        className={'spinner-border'}
        role={'status'}
        style={{ color: '#ff5c7b', width: '5rem', height: '5rem' }}
      >
        <span className={'invisible'}>Loading...</span>
      </div>
    </div>
  )
}

export default Loader
