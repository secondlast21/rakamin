import React from 'react'

interface CenterLayoutProps {
  className?: string
  children: React.ReactNode
}

const CenterLayout = ({ className, children }: CenterLayoutProps) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto z-[100] outline-none focus:outline-none gap-10'>
      {children}
    </div>
  )
}

export default CenterLayout
