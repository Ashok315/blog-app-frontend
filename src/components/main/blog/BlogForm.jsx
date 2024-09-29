import React,{useEffect, useState} from "react";
import blogService from "../../../services/blogService";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";
import { useNavigate} from "react-router-dom";
import { categories } from "../../../data/categories";
import { Select } from "../../common/Select";

export const BlogForm=({blog})=>{

    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState(null);
    const [error,setError]=useState(null);

    const [formData,setFormData]=useState({title:"",content:"",category:"uncategorized",visibility:"public",feature_image:""});
    const navigate=useNavigate();

    const handleChange=(e)=>{ 
        setFormData((prevData)=>({...prevData,[e.target.name]:e.target.type==="file"?e.target.files[0]:e.target.value}));   
    }
    
    useEffect(()=>{
            if(blog){
                setFormData((prevData)=>({...prevData,title:blog.title,content:blog.content,category:blog.category,visibility:blog.visibility})) 
            }
    },[blog])
   
    const blogData=new FormData();
    blogData.append("title",formData.title)
    blogData.append("content",formData.content)
    blogData.append("category",formData.category)
    blogData.append("visibility",formData.visibility)
    blogData.append("feature_image",formData.feature_image)

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            if(!blog){
                const response=await blogService.createBlog(blogData)
                 if(response){
                   navigate('/');
                 }
            }
            else{
                const response=await blogService.updateBlog(blog?._id,formData);
                 if(response){
                    navigate('/')
                 }
            }
          
        }catch(err){
            setError(err.message);
            console.log(err.message)
        }

    }

 
    return (
        <div className='max-w-full mx-auto'>
            <form action="#" >
                <div className="flex gap-5 mt-3">
                    <div className='basis-full'>
                        <Input name="title" label="Title" value={formData.title}  onChange={handleChange} placeholder="Title" className="rounded-md"></Input>
                    </div>
                    <div className='basis-64'>
                        <Select name="category" label="Category" options={categories} onChange={handleChange}></Select>
                    </div>
                </div>

                <div className="mt-2">
                    <Input name="content" label="Content" value={formData.content}  onChange={handleChange} placeholder="Write Content here" className="rounded-md"></Input>
                </div>

                <div className="mt-2 gap-5 flex ">
                    <div className="basis-full">
                        <Input type="file" name="feature_image" onChange={handleChange} label="Feature Image" className="rounded-md" padding="py-[0.2rem] pb-[1.85rem] px-3"></Input>
                    </div>
                    <div className="basis-64">
                        <Select name="visibility" label="Visibility" options={["public","private"]} preVal={blog?.visibility} onChange={handleChange}></Select>
                    </div>
                </div>
                
                <div className='text-center'>
                    <Button  onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary duration-300 text-white mt-4 rounded-md'>{blog?"Update":"Submit"}</Button>
                </div>
            </form>   
        
            {success&& <div>{success}</div>}
            {error&& <div>{error}</div>}
                                
       </div>
    )
}