import React from 'react'

export const Button=({
  children,
  type= "button",
  className = "",
  ...props
})=>{
  return (
    <button type={type} className={`rounded-3xl text-sm px-6 py-[0.32rem] ease-in-out duration-300 ${className}`} {...props}>
       {children}
    </button>
  );
}
