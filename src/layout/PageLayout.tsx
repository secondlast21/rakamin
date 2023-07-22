import React, { FC } from 'react'
import {Helmet} from "react-helmet";

interface PageLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
}

const PageLayout: FC<PageLayoutProps> = ({ title, description, children }) => {
  return (
    <>
        <Helmet>
            <title>{`Todo App | ${title}`}</title>
            {description && <meta name='description' content={description} />}
        </Helmet>
      {children}
    </>
  )
}

export default PageLayout
