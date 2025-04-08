import { useEffect, useRef } from 'react'

export const useClickOutside = (ref: any, callback: any, active = true) => {
  const isOutsideClick = useRef(false)
  useEffect(() => {
    if (!active) {
      return undefined
    }

    const handleOutsideMousedown = (event: any) => {
      isOutsideClick.current = ref.current
        ? !ref.current.contains(event.target)
        : false
    }

    const handleOutsideClick = (event: any) => {
      if (isOutsideClick.current) {
        callback(event)
      }
    }

    document.addEventListener('mousedown', handleOutsideMousedown)
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideMousedown)
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [ref, callback, active])
}
