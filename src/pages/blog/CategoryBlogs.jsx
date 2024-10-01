import React,{lazy, Suspense, useEffect, useState} from 'react'
import {ContentContainer, Loading, MainContainer, Pagination } from '../../components'
import blogService from '../../services/blogService'
import { useParams } from 'react-router-dom';
import { NotFound } from '../NotFound';

const BlogList=lazy(()=>import("../../components").then((module)=>({default:module.BlogList})));

export const CategoryBlogs=()=>{
    const [blogs,setBlogs]=useState([]);

    let postPerPage=6
    const [currentPage,setCurrentPage]=useState(1);

    let indexOfLastPost=currentPage*postPerPage;
    let indexOfFirstPost=indexOfLastPost-postPerPage;

    const paginate=(pageNumber)=>setCurrentPage(pageNumber);

    const {category}=useParams();

    useEffect(()=>{  
        blogService.getBlogs(category&&`?category=${category}`).then((posts)=>{
                if(posts){
                  setBlogs(posts.slice().reverse());
                }
               
        })
    },[category])

    return (
        blogs.length!==0?
                <MainContainer>
                    
                    <ContentContainer className='mt-6'> 
                        <Suspense fallback={<Loading></Loading>}>
                            <BlogList blogs={blogs.slice(indexOfFirstPost,indexOfLastPost)} ></BlogList>  
                        </Suspense>

                        {/* pagination */}
                        <Pagination postPerPage={postPerPage} totalPosts={blogs?.length} currentPage={currentPage} paginate={paginate}></Pagination>
                    </ContentContainer>   
        
                </MainContainer>
            :<NotFound/>
         )
}