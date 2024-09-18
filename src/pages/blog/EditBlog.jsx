import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../../services/blogService';
import { MainContainer,ContentContainer} from '../../components';

const BlogForm=lazy(()=>import("../../components").then((module)=>({default:module.BlogForm})));

export const EditBlog = () => {
    let {slug}=useParams();
    const [blog,setBlog]=useState(null);
    
    useEffect(()=>{
        blogService.getBlogBySlug(slug).then((res)=>{
            if(res){
                setBlog(res[0]);
            }
        });
    },[slug])


  return (
    
        <div className='mt-auto'>
            <MainContainer>
                <ContentContainer>  
                   <div className="max-w-[40rem] mx-auto py-8 px-5 md:px-14 shadow-2xl bg-white rounded-md">
                        <h1 className='text-xl font-semibold text-center mb-6'>Edit Blog</h1>
                        <Suspense fallback={<div className='text-center text-lg'>Loading...</div>}>
                            <BlogForm blog={blog}></BlogForm>  
                        </Suspense>
                   </div>                  
                </ContentContainer>
            </MainContainer>
        </div>  
  )
}
