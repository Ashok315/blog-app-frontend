import React from 'react'

export const ContentContainer = ({
  children,
  className="",
  width="max-w-7xl"
}) => {
  return (
    <div className={`${width} mx-auto px-[1rem] md:px-[2rem] ${className}`}>{children}</div>
  )
}                            

