import React, { useEffect, useState } from 'react';
import { Button } from '../common/Button';
import { imageData } from '../../data/imageData';
import { BiCircle, BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { LuCircleDot } from 'react-icons/lu';
import { BsCircleFill } from 'react-icons/bs';
import { PiCircleFill } from 'react-icons/pi';

export const Carousel=()=>{

    let [imageIndex,setImageIndex]=useState(0);

    const handlerNextSlider=()=>{
        
        imageIndex<imageData.length-1
        ?setImageIndex(imageIndex+1)
        :setImageIndex(imageIndex-imageData.length+1)

      }
 
    const handlePrevSlider=()=>{
    
        imageIndex>0
        ?setImageIndex(imageIndex-1)
        :setImageIndex(imageIndex+imageData.length-1)
    }

    useEffect(()=>{
       const timer=setInterval(()=>{
           handlerNextSlider();
        },5000)
        return ()=>clearInterval(timer);
    },[imageIndex])


    return(     
        
        <section id='Carousel' className='mt-[3.5rem]'>
  
            <div className='flex justify-between items-center relative text-white'>
                
                    <Button className='absolute top-1/2 left-0 -translate-y-1/2 rounded-sm py-2 px-[0.5rem] ml-1 bg-gray-600 bg-opacity-50 opacity-90 hover:bg-opacity-70 duration-200' onClick={handlePrevSlider}><BiLeftArrow className='text-xs'></BiLeftArrow></Button>
                
                    {imageData.map((imagePath,i)=>(
                    <img src={imagePath} alt="slider" key={imagePath} className={`${imageIndex==i?'block':'hidden'} w-full h-[46vh] object-cover opacity-90 -z-40`}/>   
                     ))}   
                   
                    <p className='hidden md:block absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 text-lg tracking-wide bg-gray-600 bg-opacity-60 text-slate-50 px-[0.8rem]  text-center py-[0.15rem] rounded-sm'>Welcome to MyBlog</p> 
                 
                    <Button className='absolute top-1/2 right-0 -translate-y-1/2 rounded-sm py-2 px-[0.5rem] mr-1 bg-gray-600 bg-opacity-50 opacity-90 hover:bg-opacity-70 duration-200' onClick={handlerNextSlider}><BiRightArrow className='text-xs'></BiRightArrow></Button>

                    <div className='absolute bottom-1 -translate-x-1/2 left-1/2 text-white bg-gray-600 bg-opacity-50 opacity-90 px-1 pt-1 rounded-md'>
                    {imageData.map((image,index)=>(
                    <button key={image} onClick={()=>{setImageIndex(index)}} className='mx-[2px] hover:scale-110 duration-300'>{imageIndex==index?<PiCircleFill className='text-xs'></PiCircleFill>:<BiCircle className='text-xs'></BiCircle>}</button>
                    ))}
                    </div>
            </div>

        </section>
  
           
    )
}