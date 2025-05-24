import React from 'react'

interface PageTitleProps {
  children: React.ReactNode
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return <h1 className='text-2xl font-bold mb-6'>{children}</h1>
}

export { PageTitle }
