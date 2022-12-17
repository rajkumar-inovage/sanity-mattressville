import React, { useEffect, useState } from 'react'

import TabletTool from './tablet-tool'
import DesktopTool from './desktop-tool'

const MattressMatchmakerTool = ({
  data: { toolTitle, subTitle, subDesc, quiz },
}) => {
  const [isTablet, setTablet] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        setTablet(window.outerWidth < 992 ? true : false)
      })
    }
  }, [setTablet])

  return (
    <section className={'matchmaker-section'}>
      {isTablet ? (
        <TabletTool
          toolTitle={toolTitle}
          subTitle={subTitle}
          subDesc={subDesc}
          quiz={quiz}
        />
      ) : (
        <DesktopTool
          toolTitle={toolTitle}
          subTitle={subTitle}
          subDesc={subDesc}
          quiz={quiz}
        />
      )}
    </section>
  )
}

export default MattressMatchmakerTool
