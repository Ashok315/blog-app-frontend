import { lazy, Suspense } from "react";
import {ContentContainer, MainContainer } from "../../components"

const BlogForm=lazy(()=>import("../../components").then((module)=>({default:module.BlogForm})));

export const AddBlog=()=>{
    
    return(
        <div className='mt-auto'>
            <MainContainer>
                <ContentContainer>  
                    <div className="max-w-[40rem] mx-auto py-8 px-5 md:px-14 shadow-2xl bg-white rounded-md">
                        <h1 className='text-xl font-semibold text-center mb-6'>Add Blog</h1> 
                        <Suspense fallback={<div className='text-center text-lg'>Loading...</div>}>
                            <BlogForm></BlogForm>  
                        </Suspense>
                </div>             
                </ContentContainer>
            </MainContainer>
        </div>
    )
}