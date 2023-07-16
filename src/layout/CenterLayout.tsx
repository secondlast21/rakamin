import React from 'react'

interface CenterLayoutProps {
  className?: string
  children: React.ReactNode
}

const CenterLayout = ({ className, children }: CenterLayoutProps) => {
  return (
    <div className={`container flex h-screen ${className}`}>
      <div className='m-auto max-sm:w-full w-2/5'>{children}</div>
    </div>
  )
}

export default CenterLayout
