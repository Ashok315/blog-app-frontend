import React, { useEffect, useState, Suspense, lazy } from 'react'
import { Button, Carousel } from '../components';
import { BiRightArrowCircle } from 'react-icons/bi';
import blogService from '../services/blogService';
import { useNavigate } from 'react-router-dom';

const BlogList=lazy(()=>import('../components').then((module) => ({ default: module.BlogList })));

export const Home = () => {

  const [blogs,setBlogs]=useState([]);
  const navigate=useNavigate();
   
  useEffect(()=>{  
      blogService.getLatestBlogs().then((posts)=>{
              if(posts){
                setBlogs(posts);
              }
      })
  },[])
 
  return (
    <>  
      <Carousel></Carousel>
      <h1 className='text-center text-[1.3rem] mt-6 mb-3'>Latest Blogs</h1>
      <Suspense fallback={<p className='text-lg text-center'>Loading...</p>}>
         <BlogList blogs={blogs}></BlogList>
      </Suspense> 

      <div className='mt-10 mb-16 text-center'>
        <Button type='button' onClick={()=>navigate('/blogs')} className='text-white bg-lightPrimary hover:bg-primary ease-in-out duration-300 '>All Blogs <BiRightArrowCircle className='inline' /></Button>
      </div>

    </>

  )
  
}
