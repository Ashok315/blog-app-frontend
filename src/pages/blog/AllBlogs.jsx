import React,{useEffect, useRef, useState} from 'react'
import { BlogList, Button, ContentContainer, Input, MainContainer } from '../../components'
import { MdArrowForwardIos } from 'react-icons/md'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { categories } from '../../data/categories'
import blogService from '../../services/blogService'
import { useParams } from 'react-router-dom'
import { Pagination } from '../../components'
import { ScrollerList } from '../../components'

export const AllBlogs=()=>{
  
    const [blogs,setBlogs]=useState([]);
    
    const postPerPage=6
    const [currentPage,setCurrentPage]=useState(1);

    const indexOfLastPost=currentPage*postPerPage;
    const indexOfFirstPost=indexOfLastPost-postPerPage;

    const paginate=(pageNumber)=>setCurrentPage(pageNumber)

    const [query,setQuery]=useState('');

    const changeQuery=(category)=>setQuery(category)
    
    useEffect(()=>{  
        blogService.getBlogs(query&&`?category=${query}`).then((posts)=>{
                if(posts){
                 setBlogs(posts.slice().reverse())
                }
               
        })
   
    },[query])



    return (
        <MainContainer>
       
           <ScrollerList lists={categories} navigateListItem={changeQuery} activeListItem={query} ></ScrollerList>
    
            <ContentContainer className='mt-11'>
                <BlogList blogs={blogs.slice(indexOfFirstPost,indexOfLastPost)}></BlogList>
                <Pagination postPerPage={postPerPage} totalPosts={blogs?.length} currentPage={currentPage} paginate={paginate}></Pagination>
            </ContentContainer>   
      
        </MainContainer>
    )
}
