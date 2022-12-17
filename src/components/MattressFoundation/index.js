import React, { Fragment } from 'react'
import Sidebar from './Sidebar'

const MattressFoundation = ({ data }) => {
  const { mattressFoundation } = data
  return (
    <Fragment>
      <section className={'section-1'}>
        <div className={'container-fluid'}>
          <div className={'d-flex flex-lg-row flex-column'}>
            <div className={'flex-shrink-1'}>
              <Sidebar />
            </div>
            <div className={'entry-data'}>
              <h1>{mattressFoundation.title}</h1>
              <div className={'entry-data-inner'}>
                <p>{mattressFoundation.desceiption1}</p>
                <h3>{mattressFoundation.subTitle1}</h3>
                <p>{mattressFoundation.desceiption2}</p>
                <h3>{mattressFoundation.subTitle2}</h3>
                <p>{mattressFoundation.desceiption3}</p>
                <h3>{mattressFoundation.subTitle3}</h3>
                <p>{mattressFoundation.desceiption4}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MattressFoundation
