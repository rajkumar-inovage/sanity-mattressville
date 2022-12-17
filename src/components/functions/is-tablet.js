import { useEffect, useState } from 'react'
import { useIsMounted } from 'react-tidy'

const IsTablet = () => {
  const [isTablet, setTablet] = useState(false),
    isMounted = useIsMounted()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isMounted() && setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        isMounted() && setTablet(window.outerWidth < 992 ? true : false)
      })
    }
  }, [isMounted, setTablet])

  return isTablet
}

export default IsTablet
