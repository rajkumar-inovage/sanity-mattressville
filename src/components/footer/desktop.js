import React, { useEffect, useRef, useState } from 'react'

import FooterData from '~/components/constants/desktop-footer-data'
import useOnScreen from '~/components/functions/useOnScreen'
import FooterTop from './footer-top'
import FooterBottom from './footer-bottom'

const Desktop = () => {
  const [loadedOnce, setLoadedOnce] = useState(false),
    { topFooter, bottomFooter } = FooterData(),
    sectionRef = useRef(),
    visible = useOnScreen(sectionRef, '100px')

  useEffect(() => {
    !loadedOnce && setLoadedOnce(visible)
  }, [loadedOnce, visible])

  return (
    <footer ref={sectionRef}>
      {(visible || loadedOnce) && <FooterTop data={topFooter} />}
      {(visible || loadedOnce) && <FooterBottom data={bottomFooter} />}
    </footer>
  )
}

export default Desktop
