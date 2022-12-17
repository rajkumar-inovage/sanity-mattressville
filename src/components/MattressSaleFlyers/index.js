import React from 'react'

import Sidebar from './sidebar'
// import Main from './main'
import Welcome from './welcome'
import Cta from './cta'

const Flyers = ({ data }) => {
  return (
    <section className={'flyer'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar />
          </div>
          <Welcome data={data} />
        </div>
      </div>
      <Cta />
    </section>
  )
}

export default Flyers
