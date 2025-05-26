import React from 'react'

interface PageContainerProps {
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className='container mx-auto p-4'>{children}</div>
}

export { PageContainer }
