import React, { useRef } from 'react'
import { ContentContainer } from '../..';
import { Button } from '../../common/Button';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { MdArrowForwardIos } from 'react-icons/md';

export const ScrollerList = ({lists,navigateListItem,activeListItem}) => {
    let btnTabs=useRef();
    let prevBtn=useRef();
    let nextBtn=useRef();
 
    // handle scroll by left arrow button
    const handleScrollLeft=()=>{
        btnTabs.current.scrollLeft+=250            
    }

    // handle scroll by right arrow button
    const handleScrollRight=()=>{
        btnTabs.current.scrollLeft-=250
    }

    // handle scrolling all tabs
    const handleScroll=()=>{
        let maxScrollWidth=btnTabs.current.scrollWidth-btnTabs.current.clientWidth;
 
        if(btnTabs.current.scrollLeft>0){
            prevBtn.current.classList.remove('hidden')
            nextBtn.current.classList.remove('hidden')
                if(Math.ceil(btnTabs.current.scrollLeft)==maxScrollWidth){
                    prevBtn.current.classList.remove('hidden')
                    nextBtn.current.classList.add('hidden')             
                }
        }    
   
        else{
            prevBtn.current.classList.add('hidden')
            nextBtn.current.classList.remove('hidden')
        }
        
    }

  return (
    <div className='overflow-hidden mt-2'>

        {/* hidden verticle scroll bar when model is visible  */}
        <style>{`#btn-tabs::-webkit-scrollbar{display:none}`}</style>

        <ContentContainer className='flex items-center justify-between text-nowrap gap-3 overflow-hidden' width='max-w-2xl'>
            <button onClick={handleScrollRight} ref={prevBtn} className={`prev-btn hidden rounded-full border border-lightBorder p-[0.28rem]`}><HiOutlineChevronLeft className='text-lg' /> </button>
            <div id='btn-tabs' onScroll={()=>handleScroll(btnTabs)} ref={btnTabs} className='overflow-x-scroll scroll-smooth'>
                <Button onClick={()=>navigateListItem('')} className={`border ${activeListItem==''?'bg-primary text-white dark:border-none':'border-gray-400 hover:bg-gray-600 duration-300 bg-gray-500 dark:bg-gray-700 dark:border-none text-white'} scale-90 px-[1.2rem] py-[0.3rem]`}>All</Button>
                {lists?.map((listItem)=>(
                    <Button key={listItem} onClick={()=>navigateListItem(listItem)} className={`border ${listItem==activeListItem?'text-white bg-primary dark:border-none':'hover:bg-gray-600 duration-200 bg-gray-500 text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-none dark:text-gray-100'} capitalize scale-90 px-[1.2rem] py-[0.3rem]`}>{listItem}</Button>
                ))}              
            </div>
            <button onClick={handleScrollLeft} ref={nextBtn} className="next-btn rounded-full border border-lightBorder p-[0.35rem]"><MdArrowForwardIos /> </button>
        </ContentContainer>    

    </div>
  )
}
