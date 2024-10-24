import React, { useId } from 'react'

export const Input = React.forwardRef(({
    label,
    type="text",
    className="",
    padding="px-2.5",
    ...props

},ref) => {

  const id=useId()
  
  return (
          <>
              {label&&<label htmlFor={id} className='text-sm'>{label}</label>}
              <input type={type} id={id} ref={ref}  className={`w-full h-[1.78rem] max-w-[900px] border text-sm border-lightBorder mt-0.5 rounded-md focus:outline-lightPrimary dark:bg-slate-600 dark:text-white dark:border-slate-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-300 dark:placeholder-[#d1d5dbbf] ${padding} ${className}`} {...props}/>
          </>
          
       
  )
})

