import React, { useEffect, useState } from 'react'
import { Button, Loading } from '../components'
import { useNavigate } from 'react-router-dom'

export const NotFound = ({resMsg="Data not found"}) => {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const timer=setTimeout(()=>{
       setLoading(false)
    },700)
    return ()=>clearTimeout(timer);
  },[])
  
  return (
     loading?<Loading></Loading>
            :
            <div className='flex flex-col gap-3 justify-center items-center h-full'>
                <h1 className='text-5xl font-semibold text-gray-700 leading-10 font-sans'>404</h1>
                <p className='text-red-700 text-[1.25rem] font-sans font-semibold'>{resMsg}</p>
                <Button onClick={()=>navigate(-1)} className='border border-gray-500'>Go Back</Button>
            </div>
  )
}
