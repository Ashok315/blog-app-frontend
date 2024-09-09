import React, { useEffect, useRef, useState } from 'react'
import { Button, Carousel } from '../components'
import { BlogList } from '../components'
import { BiRightArrowCircle } from 'react-icons/bi'
import blogService from '../services/blogService'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

  const [blogs,setBlogs]=useState([]);
  const navigate=useNavigate();
   
  useEffect(()=>{  
      blogService.getBlogs().then((posts)=>{
              if(posts){
                setBlogs(posts.slice(posts.length-6, posts.length).reverse())
              }
      })
  },[])
 
  return (
    <>
      <Carousel></Carousel>
      <h1 className='text-center text-[1.3rem] mt-6 mb-3'>Latest Blogs</h1>
      <BlogList blogs={blogs}></BlogList>
      <div className='mt-10 mb-16 text-center'>
        <Button type='button' onClick={()=>navigate('/blogs')} className='text-white bg-lightPrimary hover:bg-primary ease-in-out duration-300 '>All Blogs <BiRightArrowCircle className='inline' /></Button>
      </div>

    </>

  )
  
}
