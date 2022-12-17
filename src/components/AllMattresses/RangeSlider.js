import React, { useCallback, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

const RangeSlider = ({ min, max }) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const range = useRef(null)

  // Convert to percentage
  const getPercent = useCallback(
    value => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('price-min')) {
        setMinVal(parseInt(params.get('price-min')))
        document.querySelector(`.toggle-price`).click()
      }
      if (params.get('price-max')) {
        setMaxVal(parseInt(params.get('price-max')))
        document.querySelector(`.toggle-price`).click()
      }
    }
  }, [])

  return (
    <div className="contain">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={event => {
          const value = Math.min(Number(event.target.value), maxVal - 1),
            url = new URL(window.location)
          setMinVal(value)
          minValRef.current = value
          url.searchParams.set('price-min', value)
          window.history.replaceState({}, '', url)
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && '5' }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={event => {
          const value = Math.max(Number(event.target.value), minVal + 1),
            url = new URL(window.location)
          setMaxVal(value)
          maxValRef.current = value
          url.searchParams.set('price-max', value)
          window.history.replaceState({}, '', url)
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">min ${minVal}</div>
        <div className="slider__right-value">max ${maxVal}</div>
      </div>
    </div>
  )
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
}

export default RangeSlider
