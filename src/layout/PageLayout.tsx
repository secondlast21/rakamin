import React, { FC } from 'react'

interface PageLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
}

const PageLayout: FC<PageLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <head>
        <title>{title}</title>
        {description && (
          <meta
            name='description'
            content={description}
          />
        )}
      </head>
      {children}
    </>
  )
}

export default PageLayout
