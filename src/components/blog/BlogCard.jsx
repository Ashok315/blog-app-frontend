import React from 'react'
import { Button } from '../common/Button'
import { useNavigate } from 'react-router-dom'

export const BlogCard = ({title,slug,description,blogImage,author,authorImage,createdAt,category}) => {
  const navigate = useNavigate();
  return (
    <>
       <div className='card rounded-lg bg-white max-w-[17.8rem] p-[0.7rem] shadow-md'>
            <img src={blogImage} alt="blog-image" className='w-[18rem] h-[10.3rem] rounded-md object-cover cursor-pointer' onClick={()=>navigate(`/blog/${slug}`)} />
            <div className='my-4 leading-[1.2rem] cursor-pointer px-2'>
                <p className='font-bold text-[0.9rem]  text-gray-700 hover:text-black duration-300'>{title.slice(0,67)}..</p>
                <p className='text-wrap mt-2 text-[0.85rem]'>{description.slice(0,105)}..</p>
            </div>

            <div className='flex items-center justify-between gap-2 rounded-md mt-4 px-2'>
              <div className='flex gap-2 items-center'>
                  <img src={authorImage} alt="profile-image" className='max-w-[2.2rem] rounded-full' />   
                  <div className='leading-4 cursor-pointer'>
                      <p className='text-gray-600 text-wrap font-semibold text-[0.75rem] capitalize'>{author}</p>
                      <p className='text-gray-500 text-[0.72rem]'>{createdAt}</p>
                  </div>   
              </div>
                
              <button className='border border-lightBorder text-secondary rounded-md text-[0.72rem] px-[0.55rem] py-[0.1rem] capitalize'>{category}</button>       
            </div>
  
        </div>
    </>
   

  )
}
