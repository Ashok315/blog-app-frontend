import React,{lazy, Suspense, useEffect, useState} from 'react'
import {ContentContainer, MainContainer, Pagination } from '../../components'
import blogService from '../../services/blogService'
import { useParams } from 'react-router-dom';
import { NotFound } from '../../pages';

const BlogList=lazy(()=>import("../../components").then((module)=>({default:module.BlogList})));

export const AuthorBlogs=()=>{
    const [blogs,setBlogs]=useState([]);
    
    const postPerPage=6
    const [currentPage,setCurrentPage]=useState(1);

    const indexOfLastPost=currentPage*postPerPage;
    const indexOfFirstPost=indexOfLastPost-postPerPage;

    const paginate=(pageNumber)=>setCurrentPage(pageNumber);

    const {authorId}=useParams();

    useEffect(()=>{  
        blogService.getBlogs(authorId&&`?author=${authorId}`).then((posts)=>{
                if(posts){
                  setBlogs(posts.slice().reverse());
                }
                console.log(blogs)
               
        });
    },[authorId])

    return (
        blogs.length!==0?
                <MainContainer>
                    
                    <ContentContainer className='mt-6'> 

                    <Suspense fallback={<div className='text-center text-lg'>Loading...</div>}>
                        <BlogList blogs={blogs.slice(indexOfFirstPost,indexOfLastPost)} ></BlogList>  
                    </Suspense>
                    {/* pagination */}
                    <Pagination postPerPage={postPerPage} totalPosts={blogs?.length} currentPage={currentPage} paginate={paginate}></Pagination>

                    </ContentContainer>   
        
                </MainContainer>
            :<NotFound />  
         )
}