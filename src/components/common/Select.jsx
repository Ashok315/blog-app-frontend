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
                <select id={id} ref={ref}  className={`w-full h-[1.78rem] border text-sm border-lightBorder pl-2.5 mt-0.5 pr-10 rounded-md focus:outline-lightPrimary capitalize dark:bg-slate-600 dark:text-white dark:border-slate-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-300 ${className}`} {...props}>
                    {options?.map((option)=>(      
                        <option key={option} value={option} className="capitalize">{option}</option>
                    ))}          
                </select>
            </>
           
      )
    }
    
)
