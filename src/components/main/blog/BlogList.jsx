import React, { lazy, Suspense } from 'react'
import formatDate from '../../../utils/formatDate';

const BlogCard=lazy(()=>import('../../../components').then((module) => ({ default: module.BlogCard })));

export const BlogList=({blogs})=> {

  return (
    <>
    <div className='card-container max-w-7xl flex flex-wrap justify-center mx-auto gap-10 px-6'>
  
         
        {blogs?.map((blog)=>(
             <Suspense fallback={<p className='text-lg text-center'>Loading...</p>}>
                   <BlogCard  key={blog._id} 
                              title={blog.title}
                              slug={blog.slug}
                              description={blog.content}
                              blogImage={blog.feature_image}
                              authorName={blog.author.firstName+` `+blog.author.lastName}
                              authorId={blog.author._id}
                              authorImage={blog.author.image}
                              createdAt={formatDate(blog.createdAt)} 
                              category={blog.category}>
                   </BlogCard>
          </Suspense> 
    
        ))}

    </div>
    </>
  )
}

