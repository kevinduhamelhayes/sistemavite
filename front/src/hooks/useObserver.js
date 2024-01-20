/* eslint-disable consistent-return */
import { useEffect, useState } from 'react'

export default function useObserver(options) {
  const [ref, setRef] = useState(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options])
  return [setRef, inView]
}