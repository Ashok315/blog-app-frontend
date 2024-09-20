import { useParams } from "react-router-dom";
import api from "./api";
import axios from "axios";

const createBlog=async(blogData)=>{
  try{
    const response=await api.post('/blogs/create-blog',blogData);
    return response;
  }
  catch(err){
    throw new Error(err.message)
  }
}

const getBlogs=async (query='')=>{
   
    try{
        const response=await api.get(`/blogs/get-blogs${query}`); 
        const posts=response.data.blogs;
        return posts;   
    }
    catch(error){
      throw new Error(error.message)
    
    }
}

const getLatestBlogs=async ()=>{
   
  try{
      const response=await api.get(`/blogs/latest-blogs`); 
      const posts=response.data.blogs;
      return posts;   
  }
  catch(error){
    throw new Error(error.message)
  
  }
}


const getBlogBySlug=async (slug)=>{
   
  try{
      const response=await api.get(`/blogs/get-blog/${slug}`)
      const post=response.data.blog;
      return post;   
  }
  catch(error){
    throw new Error(error.message)
  
  }
}

const updateBlog=async(blogId,blogData)=>{
  try{
       const response=await api.patch(`/blogs/update-blog/${blogId}`,blogData);
       return response;
  }
  catch(error){
     throw new Error(error.message)
  }
}

const likeBlog=async (blogId)=>{
  try{
      const response=await api.patch(`/blogs/${blogId}/like`);
      return response;
 
  }
  catch(error){
     throw new Error(error.message)
  }
}

const addComment=async (blogId,comment)=>{
   try{
       const response=await api.patch(`/blogs/${blogId}/comment`,comment);
       return response;
   }
   catch(error){
    throw new Error(error.message)
   }
}

const deleteBlog=async (blogId)=>{
    try {
      const response=await api.delete(`/blogs/delete-blog/${blogId}`);
      return response
    } catch (error) {
      throw new Error(error.message)
    }
}


export default {createBlog,getBlogs,getBlogBySlug,updateBlog,likeBlog,addComment,getLatestBlogs,deleteBlog}