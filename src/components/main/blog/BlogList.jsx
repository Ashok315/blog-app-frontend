import React, { useEffect, useState } from 'react'
import { BlogCard } from './BlogCard'
import blogService from '../../../services/blogService';
import formatDate from '../../../utils/formatDate';

export const BlogList=({blogs})=> {


  return (
    <>

    <div className='card-container max-w-7xl flex flex-wrap justify-center mx-auto gap-10 px-6'>


        {blogs?.map((blog)=>(
          <BlogCard key={blog._id} 
                    title={blog.title}
                    slug={blog.slug}
                    description={blog.content}
                    blogImage={blog.feature_image}
                    author={blog.author.firstName+` `+blog.author.lastName}
                    authorImage={blog.author.image}
                    createdAt={formatDate(blog.createdAt)} 
                    category={blog.category}>
          </BlogCard>
        ))}

    </div>
    </>
  )
}
