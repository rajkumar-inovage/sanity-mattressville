import { useCallback, useEffect, useState } from 'react'

const useOnScreen = (containerRef, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = useCallback(
    entries => {
      const [entry] = entries
      setIsVisible(entry.isIntersecting)
    },
    [setIsVisible]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, { rootMargin })
    let observerRefValue = null

    if (containerRef.current) {
      observer.observe(containerRef.current)
      observerRefValue = containerRef.current
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue)
    }
  }, [callbackFunction, containerRef, rootMargin])

  return isVisible
}

export default useOnScreen
