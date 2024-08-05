import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../../services/blogService';
import { MainContainer,ContentContainer,BlogForm } from '../../components';

export const EditBlog = () => {
    let {slug}=useParams();
    const [blog,setBlog]=useState(null);
    
    useState(()=>{
        blogService.getBlogs(`/?slug=${slug}`).then((res)=>{
            if(res){
                setBlog(res[0])
            }
        });
    },[slug,blog])


  return (
    
        <div className='mt-auto'>
            <MainContainer>
                <ContentContainer>  
                   <div className="max-w-[40rem] mx-auto py-8 px-5 md:px-14 shadow-2xl bg-white rounded-md">
                        <h1 className='text-xl font-semibold text-center mb-6'>Edit Blog</h1>
                        <BlogForm blog={blog}></BlogForm>  
                   </div>                  
                </ContentContainer>
            </MainContainer>
        </div>  
  )
}
