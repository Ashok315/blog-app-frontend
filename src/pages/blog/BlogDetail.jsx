import {useState,useEffect} from 'react'
import { BiEdit} from "react-icons/bi"
import { Comment, ContentContainer, MainContainer } from "../../components"
import { MdDelete } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import blogService from '../../services/blogService'
import formatDate from '../../utils/formatDate'
import { useSelector } from 'react-redux'
import { FaHeart, FaRegCommentDots, FaRegHeart } from 'react-icons/fa6'
import { NotFound } from '../NotFound'

export const BlogDetail=()=>{
    
    const [blog,setBlog]=useState(null);
    const {slug}=useParams();
    const [likes,setLikes]=useState();
    const [isLiked,setIsLiked]=useState(false);
    const [refresh,setRefresh]=useState(false); 

    const navigate=useNavigate(); 
    let isAuthenticated=useSelector(state=>state.auth.isAuthenticated)
    let currentUserId=useSelector(state=>state.auth.user?._id);
    let isAuthor=blog&&currentUserId?blog.author._id===currentUserId:false;

    const refreshToggle=()=>{
        setRefresh(!refresh)
    }

    const handleDelete=async ()=>{
        let confirmedByUser=confirm("Are you sure you want to delete blog?");
        if(confirmedByUser){
            await blogService.deleteBlog(blog._id).then(()=>{  
                alert("blog deleted successfully");
                navigate('/blogs');
            })
        }
    
    }

    const likeToggleBtn=async()=>{
        if(isAuthenticated){
            await blogService.likeBlog(blog._id).then(res=>{
                if(res){
                    setLikes(res.data.blogs.likes.lengh);
                    setIsLiked(!isLiked);
                    refreshToggle();
                }
            });
        }
      else{
            if(confirm("You must be logged in if you want to like the blog")){
                navigate('/sign_in')
            }     
         }
    }

    useEffect(()=>{  
        
        blogService.getBlogBySlug(slug).then((res)=>{
            if(res)   {
                setBlog(res[0]);
                setLikes(res[0].likes.length);  
                setIsLiked(res[0].likes.includes(currentUserId));       
         }             
        });      
        
    },[slug,refresh])

   return  blog? (  
     <div>
         <MainContainer>
            <ContentContainer className="bg-white py-6 rounded-md" width="max-w-[53rem]">
                
                <div className='flex items-center justify-between gap-2 rounded-md'>
                    <div className='flex gap-2 items-center'>
                        <img src={blog?.author.image} alt="profile-image" className='w-[32px] h-[32px] max-w-[35px] max-h-[35px] rounded-full object-cover' />   
                        <div className='leading-4 cursor-pointer'>
                            <p className='text-gray-600 text-wrap font-semibold text-[0.85rem] capitalize'>{blog.author.firstName+' '+blog.author.lastName}</p>
                            <p className='text-gray-500 text-[0.75rem]'>{formatDate(blog.createdAt)}</p>
                        </div>   
                    </div>

                    {isAuthor&&
                        <div className="d-flex">
                                <button onClick={()=>navigate(`/edit_blog/${slug}`)} className='text-white bg-blue-600 opacity-90 hover:bg-blue-700 duration-200 rounded-[4px] text-[0.75rem] px-[0.6rem] py-[0.28rem] mr-2'><BiEdit className="inline-block mr-1 mt-[-2px]"></BiEdit>Edit</button>       
                                <button onClick={handleDelete}  className='text-white bg-red-600 hover:bg-red-700 duration-200 rounded-[4px] text-[0.75rem] px-[0.6rem] py-[0.28rem]'><MdDelete className="inline-block mr-1 mt-[-2px]"></MdDelete>Delete</button>
                        </div>
                    } 
                       
                </div>
                <h1 className="text-xl text-gray-700 font-semibold mt-5">{blog.title}</h1>
                <div className="px-5">
                     <img src={blog.feature_image} className="w-svw h-auto mx-auto mt-3 rounded-md" alt="blogImage" />
                </div>

                <p className="mt-5 px-5">{blog.content}</p>

                <hr className='border border-slate-300 my-3'></hr>

                {/* like and comment section*/}
                <div className="mt-5 flex gap-4 items-center ml-8">
                   <button onClick={likeToggleBtn} className="basis-24 text-gray-600 text-sm">{!!isLiked?<FaHeart className="text-red-600 text-lg inline-block mr-2 mb-1"/>:<FaRegHeart className="text-gray-600 text-lg inline-block mr-2 mb-1" />}Likes &#40;{likes}&#41;</button>
                   <button className="text-gray-600 text-sm basis-32 cursor-default"><FaRegCommentDots className="text-[1.2rem] inline-block mb-1 mr-2 text-gray-600"/>Comments &#40;{blog?.comments.length}&#41;</button>
                </div>
                
                {/* comment section */}
                <Comment blog={blog} refresh={refreshToggle}></Comment>

            </ContentContainer>
        </MainContainer>
     </div>
   ):<NotFound/>
}