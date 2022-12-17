import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'

import useOnScreen from '~/components/functions/useOnScreen'

const SalesNDeals = ({ data: { allMattresses, clearance, deals } }) => {
  const sectionRef = useRef(),
    [loadedOnce, setLoadedOnce] = useState(false),
    visible = useOnScreen(sectionRef, '100px')

  useEffect(() => {
    !loadedOnce && setLoadedOnce(visible)
  }, [loadedOnce, visible])

  return (
    <section ref={sectionRef} className={'sales-n-deals'}>
      {(visible || loadedOnce) && (
        <div className={'container-fluid'}>
          <div className={'row justify-content-center'}>
            <div className={'col-12 col-sm-4 text-center'}>
              <Link to={'/all-mattresses/'}>
                <img
                  loading={'lazy'}
                  alt={
                    'three mattresses stacked vertically on a floor, all mattresses'
                  }
                  src={
                    allMattresses.childImageSharp.gatsbyImageData.images
                      .fallback.src
                  }
                  className={'img-fluid mb-3'}
                  style={{
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                  }}
                  height={allMattresses.childImageSharp.gatsbyImageData.height}
                  width={allMattresses.childImageSharp.gatsbyImageData.width}
                />
              </Link>
            </div>
            <div className={'col-12 col-sm-4 text-center'}>
              <Link to={'/all-mattresses/clearance/'}>
                <img
                  loading={'lazy'}
                  alt={`mattress clearance, last chance deals, clock`}
                  src={
                    clearance.childImageSharp.gatsbyImageData.images.fallback
                      .src
                  }
                  className={'img-fluid mb-3'}
                  style={{
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                  }}
                  height={allMattresses.childImageSharp.gatsbyImageData.height}
                  width={allMattresses.childImageSharp.gatsbyImageData.width}
                />
              </Link>
            </div>
            <div className={'col-12 col-sm-4 text-center'}>
              <Link to={'/all-mattresses/flash-deals/'}>
                <img
                  loading={'lazy'}
                  alt={`mattress flash deals, family having pillow fight, cat sleeping under covers, bed with blue comforter set`}
                  src={
                    deals.childImageSharp.gatsbyImageData.images.fallback.src
                  }
                  className={'img-fluid mb-3'}
                  style={{
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                  }}
                  height={allMattresses.childImageSharp.gatsbyImageData.height}
                  width={allMattresses.childImageSharp.gatsbyImageData.width}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
export default SalesNDeals
