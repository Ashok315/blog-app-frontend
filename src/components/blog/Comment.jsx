import React, {useEffect, useState } from 'react'
import blogService from '../../services/blogService';
import { Button } from '../common/Button';
import formatDate from '../../utils/formatDate';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Comment = ({blog,refresh}) => {

    let navigate=useNavigate()
    let isAuthenticated=useSelector(state=>state.auth.isAuthenticated);

    const [comment,setComment]=useState("");
    const [commentList,setCommentList]=useState(5)

    const handleSubmit=async()=>{
     
      if(isAuthenticated){
        
        try{
          const response= await blogService.addComment(blog._id,{comment});
          if(response){
            setComment('');
            refresh();
          }
        }
        catch(error){
            throw new Error(error.message)
        }

      }

      else{
        if(confirm("You must be logged in if you want to comment on blog")){
          navigate('/sign_in')
      }  
      }

       
    }
    

  return (
    <>
        <div className='mt-6'>

            <p>Add a Comment</p>
            <div className='flex gap-2 items-center mt-2'>
                <img src={blog?.author.image} alt="author_image" className='max-w-[35px] rounded-full' />        
                <textarea id='comment' name="comment" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Write a comment' rows="1" className='w-full border border-gray-500 p-2 rounded-md'></textarea>
                <Button onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary duration-300 text-white rounded-md'>Submit</Button>

            </div>
      
        </div>

        <p className='mt-5 -mb-2'>Comments</p>
        
        <hr className='border border-slate-300 my-4'></hr>
   
        {
          blog?.comments.slice(blog.comments.length-commentList,blog.comments.lenth).reverse().map((item)=>{
            if(item.comment){
                return (
                    <div key={item._id} className='ml-8 text-xs -mt-1'>
                        <div className='flex gap-2 items-center mt-3'>
                            <img src={item.commentedBy.image} alt="author_image" className='max-w-[32px] rounded-full mt-3' />     
                            <p className='capitalize font-semibold text-gray-700'>{item.commentedBy.firstName+" "+item.commentedBy.lastName}</p>
                            <p className='text-gray-600'><span className='pr-1.5 font-semibold'>&#x2022;</span>{formatDate(item.commentedBy.createdAt)}</p>
                         </div>
                         <p className='ml-11 text-sm -mt-2'>{item.comment}</p>
                    </div>
                         
                )        
              }    
          })
        
         }
    
    <div className={`${commentList===blog.comments.length||blog.comments.length<=5?'hidden':"text-center my-3"} `}>
        <button onClick={()=>setCommentList(blog.comments.length)} className='text-[0.9rem] text-primary'>Show more...</button>
    </div>

    <hr className='border border-slate-400 my-5'></hr>
      
    </>
  )
}
