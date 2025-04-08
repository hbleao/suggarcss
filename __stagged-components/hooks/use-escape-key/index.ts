/* eslint-disable no-undef */
import { useEffect } from 'react'

export const useEscapeKey = (callback: any, active = true) => {
  const isEscape = (event: any) => event.key === 'Escape'

  useEffect(() => {
    if (!active) {
      return undefined
    }

    const handleEscapePress = (event: any) => {
      if (isEscape(event)) {
        callback(event)
      }
    }

    document.addEventListener('keydown', handleEscapePress)
    return () => {
      document.removeEventListener('keydown', handleEscapePress)
    }
  }, [callback, active])
}
