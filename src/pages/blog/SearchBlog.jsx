import React,{lazy, Suspense, useEffect, useState} from 'react'
import {ContentContainer, Loading, MainContainer, Pagination } from '../../components'
import blogService from '../../services/blogService'
import {useParams } from 'react-router-dom'

const BlogList=lazy(()=>import("../../components").then((module)=>({default:module.BlogList})));

export const SearchBlog = () => {

    const [blogs,setBlogs]=useState([]);

    let postPerPage=6
    const [currentPage,setCurrentPage]=useState(1);

    let indexOfLastPost=currentPage*postPerPage;
    let indexOfFirstPost=indexOfLastPost-postPerPage;

    const paginate=(pageNumber)=>setCurrentPage(pageNumber)

    const {searchTerm}=useParams()
        
    useEffect(()=>{  
        blogService.getBlogs().then((posts)=>{
                if(posts){
                  setBlogs(posts.filter((blog)=>blog.title.includes(searchTerm.toLowerCase())).slice().reverse())
                }
               
        })      
    },[searchTerm])


    return (
        <MainContainer>
            
            {blogs.length>0?<h1 className='text-center text-lg'>{blogs.length} Results found</h1>:<h1 className='text-center text-lg'>No Result Found</h1>}

            <ContentContainer className='mt-6'> 

              <Suspense fallback={<Loading></Loading>}>
                 <BlogList blogs={blogs.slice(indexOfFirstPost,indexOfLastPost)} ></BlogList>  
              </Suspense>
              {/* pagination */}
              <Pagination postPerPage={postPerPage} totalPosts={blogs?.length} currentPage={currentPage} paginate={paginate}></Pagination>

            </ContentContainer>   
      
        </MainContainer>
    )
}
