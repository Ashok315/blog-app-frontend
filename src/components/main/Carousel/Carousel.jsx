import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Button } from '../../common/Button';
import { imageData } from '../../../data/imageData';
import { BiCircle, BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { PiCircleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import "./Carousel.css"


export const Carousel = () => {
  let [imageIndex, setImageIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);

  const navigate=useNavigate();

  const handlerNextSlider = () => {
    setExitingIndex(imageIndex);
    setImageIndex((prevIndex) => (prevIndex + 1) % imageData.length);
  };

  const handlePrevSlider = () => {
    setExitingIndex(imageIndex);
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handlerNextSlider();
    }, 6000);
    return () => clearInterval(timer);
  }, [imageIndex]);

  return (
    <>        
        <section id="Carousel" className="mt-[3.5rem] carousel">
            <div className="flex justify-between items-center relative text-white">
                <Button
                    className="absolute top-1/2 left-0 -translate-y-1/2 rounded-sm py-2 !px-[0.45rem] ml-1 bg-gray-600 bg-opacity-50 opacity-90 hover:bg-opacity-70 duration-200"
                    onClick={handlePrevSlider}
                    >
                        <BiLeftArrow className="text-xs" fetchpriority="low"></BiLeftArrow>    
                </Button>

                <div className="bg-gray-900 w-full -z-40 carousel-inner relative h-[50vh] md:h-[55vh]">
                  {imageData.map((imagePath, i) => (
                      <img
                        src={imagePath}
                        alt="slider"
                        key={imagePath}
                        fetchpriority="high"
                        className={`carousel-item ${imageIndex === i ? 'active' : ''} ${
                            exitingIndex === i ? 'exiting' : ''
                        } w-full h-full object-cover`} />
                  ))}
                </div>
 
                <div className='hidden md:block absolute left-[6.5rem]'>
                    <p className='tracking-wide font-semibold text-[1.3rem] w-[56%] leading-[1.65rem]'> Start Your Blogging Journey Today And reach a global audience</p>
                    <p className='pt-[0.65rem] w-[43%] leading-5 text-sm'>Empower your voice, build your audience, And make an impact with every post</p>
                    <Button type='button' onClick={()=>navigate('/add_blog')} className='mt-[0.9rem] bg-primary text-white hover:bg-lightPrimary duration-300 rounded-md'>Start Writing Now</Button>
                </div>
                
                {/* mobile screen */}
                <div className='md:hidden w-[76vw] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                  <p className='text-center font-semibold tracking-wide leading-[1.5rem]'>Start Your Blogging Journey Today And reach a global audience</p>
                  <div className='text-center'>
                    <Button type='button' onClick={()=>navigate('/add_blog')} className='mt-[0.8rem] bg-primary text-white hover:bg-lightPrimary duration-300 rounded-md'>Start Writing Now</Button>
                  </div>
                </div>

              
       
                <Button
                    className="absolute top-1/2 right-0 -translate-y-1/2 rounded-sm py-2 !px-[0.45rem] mr-1 bg-gray-600 bg-opacity-50 opacity-90 hover:bg-opacity-70 duration-200"
                    onClick={handlerNextSlider}
                    >
                          <BiRightArrow className="text-xs" fetchpriority="low"></BiRightArrow>                 
                </Button>

                <div className="absolute bottom-1 -translate-x-1/2 left-1/2 text-white bg-gray-600 bg-opacity-50 opacity-90 px-1 pt-1 rounded-md">
                {imageData.map((image, index) => (
                    <button
                    key={image}
                    onClick={() => {
                        setImageIndex(index);
                    }}
                    className="mx-[2px] hover:scale-110 duration-300"
                    >
                    {imageIndex === index ? (
                            <PiCircleFill className="text-xs" fetchpriority="low"></PiCircleFill>
                    ) : (  
                           <BiCircle className="text-xs" fetchpriority="low"></BiCircle>
                       
                    )}
                    </button>
                ))}
                </div>
         </div>
    </section>
</>

  );
};

