import React,{lazy, Suspense, useEffect, useRef, useState} from 'react'
import {ContentContainer, Loading, MainContainer } from '../../components'
import { categories } from '../../data/categories'
import blogService from '../../services/blogService'
import { Pagination } from '../../components'
import { ScrollerList } from '../../components'

const BlogList=lazy(()=>import('../../components').then((module) => ({ default: module.BlogList })));

export const AllBlogs=()=>{
  
        const [blogs,setBlogs]=useState([]);
        
        let postPerPage=6
        const [currentPage,setCurrentPage]=useState(1);

        let indexOfLastPost=currentPage*postPerPage;
        let indexOfFirstPost=indexOfLastPost-postPerPage;

        const paginate=(pageNumber)=>setCurrentPage(pageNumber)

        const [query,setQuery]=useState('');

        const changeQuery=(category)=>setQuery(category);
    
        useEffect(()=>{  
            blogService.getBlogs(query&&`?category=${query}`).then((posts)=>{
                    if(posts){
                        setBlogs(posts.reverse());
                        setCurrentPage(1);
                    }         
            })
        },[query])

    return (
        <MainContainer> 
           <ScrollerList lists={categories} navigateListItem={changeQuery} activeListItem={query} ></ScrollerList>
            <ContentContainer className='mt-8'>
                <Suspense fallback={<Loading></Loading>}>
                     <BlogList blogs={blogs.slice(indexOfFirstPost,indexOfLastPost)}></BlogList>
                </Suspense>
                <Pagination postPerPage={postPerPage} totalPosts={blogs?.length} currentPage={currentPage} paginate={paginate}></Pagination>
            </ContentContainer>  
        </MainContainer>
    )
}

