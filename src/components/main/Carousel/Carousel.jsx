import React, {useEffect, useState } from 'react';
import { Button } from '../../common/Button';
import { imageData } from '../../../data/imageData';
import { BiCircle, BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { PiCircleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import "./Carousel.css"


export const Carousel = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);

  const navigate=useNavigate();

  // handle when click right side arrow button
  const handlerNextSlider = () => {
    setExitingIndex(imageIndex);
    setImageIndex((prevIndex) => (prevIndex + 1) % imageData.length);
  };

  // handle when click left side arrow button
  const handlePrevSlider = () => {
    setExitingIndex(imageIndex);
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
  };

  // change slider image every 6 seconds
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
                {/*Left arrow button  */}
                <Button onClick={handlePrevSlider} aria-label="previous-slide" className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-sm py-2 !px-[0.45rem] ml-1 bg-gray-600 bg-opacity-50 opacity-90 hover:bg-opacity-70 duration-200">
                        <BiLeftArrow className="text-xs" fetchpriority="low"></BiLeftArrow>    
                </Button>

                {/* Carousel images */}
                <div className="bg-gray-900 w-full  carousel-inner relative h-[55vh]">
                  {imageData.map((imagePath, i) => (
                      <img
                        src={`${imagePath}.jpg`}
                        srcSet={`${imagePath}.webp 1x, ${imagePath}-small.jpg 340w`}
                        sizes="(max-width: 340px) 340px"
                        alt="slider"
                        key={imagePath}
                        fetchpriority="high"
                        className={`carousel-item ${imageIndex === i ? 'active' : ''} ${
                            exitingIndex === i ? 'exiting' : ''
                        } w-full h-full max-h-[55vh]  object-cover`} />
                  ))}
                </div>
                
                {/* inner carousel text in medium screen */}
                <div className='hidden md:block absolute left-[6.5rem] z-50'>
                    <p className='tracking-wide font-semibold text-[1.18rem] w-[56%] leading-[1.6rem]'> Start Your Blogging Journey Today And reach a global audience</p>
                    <p className='pt-[0.65rem] w-[48%] leading-[1.2rem] text-sm'>Empower your voice, build your audience, And make an impact with every post</p>
                    <Button type='button' onClick={()=>navigate('/add_blog')} aria-label="create blog" className='mt-[0.9rem] bg-primary text-white hover:bg-lightPrimary duration-300 rounded-md'>Start Writing Now</Button>
                </div>
                
                {/*inner carousel text in small screen*/}
                <div className='md:hidden carousel-text w-[76vw] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50'>
                  <p className='text-center font-semibold tracking-wide leading-[1.5rem]'>Start Your Blogging Journey Today And reach a global audience</p>
                  <div className='text-center'>
                    <Button type='button' onClick={()=>navigate('/add_blog')} aria-label="create blog" className='mt-[0.85rem] bg-primary text-white hover:bg-lightPrimary duration-300 rounded-md'>Start Writing Now</Button>
                  </div>
                </div>

                {/* Right arrow button  */}
                <Button onClick={handlerNextSlider} aria-label="next-slide" className="absolute top-1/2 right-0 z-20 -translate-y-1/2 rounded-sm py-2 !px-[0.45rem] mr-1 bg-gray-600 bg-opacity-50 opacity-90 hover:bg-opacity-70 duration-200">
                          <BiRightArrow className="text-xs" fetchpriority="low"></BiRightArrow>                 
                </Button>

                <div className="absolute bottom-1 -translate-x-1/2 left-1/2 text-white bg-gray-600 bg-opacity-50 opacity-90 px-1 pt-1 rounded-md z-[60]">
                {imageData.map((image, index) => (
                    <button key={image} onClick={() =>setImageIndex(index)} aria-label="slider-button" className="mx-[2px] hover:scale-110 duration-300">
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

