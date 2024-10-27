import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../../services/blogService';
import { MainContainer,ContentContainer, Loading} from '../../components';

const BlogForm=lazy(()=>import("../../components").then((module)=>({default:module.BlogForm})));

export const EditBlog = () => {
    const {slug}=useParams();
    const [blog,setBlog]=useState(null);
    
    useEffect(()=>{
        blogService.getBlogBySlug(slug).then((res)=>{
            if(res){
                setBlog(res[0]);
            }
        });
    },[slug])


  return (
    
  
                <div className="min-h-screen flex flex-col justify-center items-center px-[1rem] md:px-[2rem]">  
                   <div className="max-w-[40rem] my-[5.5rem] py-8 px-5 md:px-14 shadow-2xl bg-white dark:bg-slate-700 rounded-md">
                        <h1 className='text-xl font-semibold text-center mb-6'>Edit Blog</h1>
                        <Suspense fallback={<Loading></Loading>}>
                            <BlogForm blog={blog}></BlogForm>  
                        </Suspense>
                   </div>                  
                </div>

  )
}
