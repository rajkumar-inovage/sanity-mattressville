import React, { Fragment } from 'react'
import ReactHtmlParser from 'html-react-parser'
import Sidebar from './Sidebar'

const MattressBuyingGuide = ({ data }) => {
  const { mattressSizes } = data
  return (
    <Fragment>
      <section className={'section-2'}>
        <div className={'container-fluid'}>
          <div className={'d-flex flex-lg-row flex-column'}>
            <div className={'flex-shrink-1'}>
              <Sidebar />
            </div>
            <div className={'entry-data'}>
              <div className={'entry-data-inner'}>
                <h1>{mattressSizes.title1}</h1>
                <div className={'mattress-size px-2 px-md-0'}>
                  <h3>{mattressSizes.size1}</h3>
                  <h3>{mattressSizes.size2}</h3>
                  <h3>{mattressSizes.size3}</h3>
                  <h3>{mattressSizes.size4}</h3>
                </div>
                <h2>{mattressSizes.title2}</h2>
                <p>{mattressSizes.smallText}</p>
                <h3>{mattressSizes.subTitle1}</h3>
                <p>{mattressSizes.description1}</p>
                <h3>{mattressSizes.subTitle2}</h3>
                <p>{ReactHtmlParser(mattressSizes.description2)}</p>
                <h3>{mattressSizes.subTitle3}</h3>
                <p>{ReactHtmlParser(mattressSizes.description3)}</p>
                <h3>{mattressSizes.subTitle4}</h3>
                <p>{ReactHtmlParser(mattressSizes.description4)}</p>
                <p>{ReactHtmlParser(mattressSizes.description5)}</p>
                <p>{ReactHtmlParser(mattressSizes.description6)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MattressBuyingGuide
