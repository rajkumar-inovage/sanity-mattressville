import { useEffect, useState } from 'react'
import { useIsMounted } from 'react-tidy'

const IsTabletXl = () => {
  const [isTabletXl, setTabletXl] = useState(false),
    isMounted = useIsMounted()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isMounted() && setTabletXl(window.outerWidth < 1200 ? true : false)
      window.addEventListener('resize', () => {
        isMounted() && setTabletXl(window.outerWidth < 1200 ? true : false)
      })
    }
  }, [isMounted, setTabletXl])

  return isTabletXl
}

export default IsTabletXl
