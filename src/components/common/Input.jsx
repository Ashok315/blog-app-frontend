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
              <input type={type} id={id} ref={ref}  className={`w-full h-[1.8rem] max-w-[900px] border text-sm border-lightBorder mt-0.5 rounded-md focus:outline-lightPrimary ${padding} ${className}`} {...props}/>
          </>
          
       
  )
})

