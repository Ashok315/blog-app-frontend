import React, { forwardRef, useId } from 'react'

export const Select =forwardRef(
    ({
        label,
        options,
        preVal,
        className="",
        ...props
    },ref) => {
    
    const id=useId();
      return (
            <>
                {label&& <label htmlFor={id} className='text-sm'>{label}</label>}
                <select id={id} ref={ref}  className={`w-full h-[1.87rem] border text-sm border-lightBorder pl-2.5 mt-0.5 pr-10 rounded-md focus:outline-lightPrimary capitalize ${className}`} {...props}>
                    {options?.map((option)=>(      
                        <option key={option} value={option} className="capitalize">{option}</option>
                    ))}          
                </select>
            </>
           
      )
    }
    
)
