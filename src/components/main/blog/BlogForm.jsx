import React,{useEffect, useState} from "react";
import blogService from "../../../services/blogService";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";
import { useNavigate} from "react-router-dom";
import { categories } from "../../../data/categories";
import { Select } from "../../common/Select";
import { toast } from "react-toastify";

export const BlogForm=({blog})=>{

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
    blogData.append("feature_image",formData.feature_image);

    const [errors, setErrors]=useState();

    // validate form Data
    const validateForm=()=>{
        let newErrors={};

        if(!formData.title || !formData.title.trim()){
          newErrors.title="Title is required"
        }
        if(!formData.content || !formData.content.trim()){
          newErrors.content="Content is required"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
     }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const isValid=validateForm();

        if(isValid){
            try{
                if(!blog){
                    const response=await blogService.createBlog(blogData)
                    if(response){
                    toast.success(response.data.message);
                    navigate('/');
                    }
                }
                else{
                    const response=await blogService.updateBlog(blog?._id,blogData);
                    if(response){
                        toast.success(response.data.message)
                        navigate('/')
                    }
                }
            
            }catch(err){
                toast.error(err.message);
            }            
         }

    }
 
    return (
        <div className='max-w-full mx-auto'>
            <form action="#" >
                <div className="flex gap-5 mt-3">
                    <div className='basis-full'>
                        <Input name="title" label="Title" value={formData.title}  onChange={handleChange} placeholder="Title" className={`${errors?.title&&'border-[1.5px] border-red-500'}`}></Input>
                         {errors?.title&& <span className="text-red-500">{errors.title}</span>}
                    </div>
                    <div className='basis-64'>
                        <Select name="category" label="Category" options={categories} onChange={handleChange}></Select>
                    </div>
                </div>

                <div className="mt-2">
                    <Input name="content" label="Content" value={formData.content}  onChange={handleChange} placeholder="Write Content here" className={`${errors?.content&&'border-[1.5px] border-red-500'}`}></Input>
                    {errors?.content&& <span className="text-red-500">{errors.content}</span>}
                </div>

                <div className="mt-2 gap-5 flex ">
                    <div className="basis-full">
                        <Input type="file" name="feature_image" onChange={handleChange} label="Feature Image" padding="py-[0.463rem] pb-[2.1rem] px-3"></Input>
                    </div>
                    <div className="basis-64">
                        <Select name="visibility" label="Visibility" options={["public","private"]} preVal={blog?.visibility} onChange={handleChange}></Select>
                    </div>
                </div>
                
                <div className='text-center'>
                    <Button  onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary dark:bg-primary dark:hover:bg-lightPrimary duration-300 text-white mt-4 rounded-md'>{blog?"Update":"Submit"}</Button>
                </div>
            </form>   
                                
       </div>
    )
}