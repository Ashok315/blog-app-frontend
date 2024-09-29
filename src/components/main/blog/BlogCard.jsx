import React from 'react'
import { useNavigate} from 'react-router-dom'
import { LazyImage } from '../../common/LazyImage';

export const BlogCard = ({title,slug,description,blogImage,authorName,authorId,authorImage,createdAt,category}) => {
 
  const navigate = useNavigate();

  return (
    <>
       <div className='card rounded-lg bg-white max-w-[17.8rem] p-[0.7rem] shadow-md'>
            {/* blog image */}
            <LazyImage src={blogImage} alt="blog-image" onClick={()=>navigate(`/blog/${slug}`)} className='bg-gray-300 w-[18rem] h-[10.3rem] rounded-md object-cover' />
            
            {/* blog-content */}
            <div onClick={()=>navigate(`/blog/${slug}`)} className='blog-content my-4 leading-[1.2rem] cursor-pointer px-2'>
                <p className='blog-title font-bold text-[0.9rem]  text-gray-700 hover:text-black duration-300'>{title.slice(0,67)}..</p>
                <p className='blog-description text-wrap mt-2 text-[0.85rem]'>{description.slice(0,105)}..</p>
            </div>

            {/* author and other details */}
            <div className='flex items-center justify-between gap-2 rounded-md mt-4 px-2'>
                  <div className='flex gap-2 items-center'>
                      <LazyImage src={authorImage} alt='author-image' onClick={()=>navigate(`/blogs/author/${authorId}`)} className='w-[30px] h-[30px] max-w-[35px] max-h-[35px] rounded-full object-cover'></LazyImage>
                      <div onClick={()=>navigate(`/blogs/author/${authorId}`)} className='leading-4 cursor-pointer'>
                          <p className='author-name text-gray-600 text-wrap font-semibold text-[0.75rem] capitalize'>{authorName}</p>
                          <p className='created-date text-gray-500 text-[0.72rem]'>{createdAt}</p>
                      </div>   
                  </div>
                    
                  <button onClick={()=>navigate(`/blogs/${category}`)} className='category-btn border border-lightBorder text-secondary rounded-md text-[0.72rem] px-[0.55rem] py-[0.1rem] capitalize'>{category}</button>       
            </div>
  
        </div>
    </>
   

  )
}
