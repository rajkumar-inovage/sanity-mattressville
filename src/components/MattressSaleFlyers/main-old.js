import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'html-react-parser'
import Gallery from '@browniebroke/gatsby-image-gallery'

const Main = ({ data: { flyerTypes, flyers } }) => {
  const [activeSet, updateActiveSet] = useState('GTA'),
    [activeFlyersSet, updateActiveFlyersSet] = useState([]),
    changeActiveFlyerSet = setType => {
      updateActiveFlyersSet(
        flyers.filter(({ type }) => {
          return setType === type
        })
      )
      updateActiveSet(setType)
    }

  useEffect(() => {
    updateActiveFlyersSet(
      flyers.filter(({ type }) => {
        return activeSet === type
      })
    )
  }, [flyers, activeSet, updateActiveFlyersSet])

  return (
    <div className={'flex-grow-1'}>
      <div className={'product-main'}>
        <h1 className={'main-heading'}>Mattress Sale Flyers</h1>
        <div className={'header-box'}>
          {flyerTypes.map(({ type, label }) => (
            <button
              key={type}
              type={'button'}
              className={`link${activeSet === type ? ' active' : ''}`}
              onClick={() => changeActiveFlyerSet(type)}
            >
              {label}
            </button>
          ))}
        </div>
        {activeFlyersSet.length > 0 &&
          activeFlyersSet.map(({ image, title, description }, index) => {
            return (
              <div key={index}>
                <h2 className={'text-center mb-3'}>{title}</h2>
                <p>{ReactHtmlParser(description)}</p>
                <div className={'row justify-content-center mb-5'}>
                  <div className={'col-7'}>
                    <Gallery
                      colWidth={100}
                      mdColWidth={100}
                      rowMargin={0}
                      gutter={0}
                      images={[image.localImage.childImageSharp]}
                      imgClass={'c-zoom-in'}
                    />
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Main
