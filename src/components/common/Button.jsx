import React from 'react'

export const Button=({
  children,
  type= "button",
  className = "",
  ...props
})=>{
  return (
    <button type={type} className={`rounded-md text-[0.8rem] px-[1.32rem] py-[0.32rem] font-semibold tracking-[0.03em] ease-in-out duration-300 ${className}`} {...props}>
       {children}
    </button>
  );
}
