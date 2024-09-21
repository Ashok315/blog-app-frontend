import React from 'react'

export const MainContainer = ({children,className=""}) => {
  return (
    <div className={`my-[5.5rem] ${className}`}>{children}</div>
  )
}
