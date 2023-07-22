import React, { FC, useEffect, useRef } from 'react'

export const useWrapper = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    // event when click outside of element
    const onClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    // bind the event listener
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener('mousedown', onClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}

interface WrapperLayoutProps {
  children: React.ReactNode
  callback: () => void
}

const WrapperLayout: FC<WrapperLayoutProps> = ({ children, callback }) => {
  const wrapperRef = useRef(null)
  useWrapper(wrapperRef, callback)

  return <div ref={wrapperRef}>{children}</div>
}

export default WrapperLayout
