import api from "./api";

// create blog 
const createBlog=async(blogData)=>{
  try{
    const response=await api.post('/blogs/create-blog',blogData);
    return response;
  }
  catch(err){
    throw new Error(err.message)
  }
}

// get blogs 
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

// get latest blogs 
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

// get blog by slug 
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

// update blog 
const updateBlog=async(blogId,blogData)=>{
  try{
       const response=await api.patch(`/blogs/update-blog/${blogId}`,blogData);
       return response;
  }
  catch(error){
     throw new Error(error.message)
  }
}

// like blog post
const likeBlog=async (blogId)=>{
  try{
      const response=await api.patch(`/blogs/${blogId}/like`);
      return response;
 
  }
  catch(error){
     throw new Error(error.message)
  }
}

// add comment on blog post
const addComment=async (blogId,comment)=>{
   try{
       const response=await api.patch(`/blogs/${blogId}/comment`,comment);
       return response;
   }
   catch(error){
    throw new Error(error.message)
   }
}

// delete blog
const deleteBlog=async (blogId)=>{
    try {
      const response=await api.delete(`/blogs/delete-blog/${blogId}`);
      return response
    } catch (error) {
      throw new Error(error.message)
    }
}


export default {createBlog,getBlogs,getBlogBySlug,updateBlog,likeBlog,addComment,getLatestBlogs,deleteBlog}