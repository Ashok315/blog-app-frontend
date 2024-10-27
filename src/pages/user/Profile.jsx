import React, {useRef,useState } from 'react'
import { Button, Input, Modal } from '../../components'
import { BiCamera, BiEdit} from 'react-icons/bi'
import { FaRectangleList } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../../services/userService'
import {login} from '../../redux/authSlice'
import "./Profile.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Profile = () => {
 
  const userData=useSelector(state=>state.auth.user);
  const avtar=useRef();

  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const [userAvtar,setUserAvtar]=useState(userData?.image)
  const [uploadProgress,setUploadProgress]=useState()

  const [isModalVisible,setIsModalVisible]=useState(false);
  const [formData,setFormData]=useState({firstName:userData.firstName,lastName:userData.lastName});
  const [errors, setErrors]=useState();

  const updateProgressStatus=(status)=>{
        setUploadProgress(status);     
  }
  
  // handle when user edit profile image
  const handleFileChange=async(e)=>{
      e.preventDefault();
      let profileImage=new FormData();
      profileImage.append('image',e.target.files[0]);
      let localImagePath=URL.createObjectURL(e.target.files[0]);
      setUserAvtar(localImagePath);

        if(localImagePath){
            try{         
                await userService.updateProfileImage(userData._id, profileImage, updateProgressStatus)
                          .then((res)=>{
                              dispatch(login(res.data.updatedUser));
                              setUploadProgress('');
                              toast.success(res.data.message);
                          })
            }
            catch(error){
              setUploadProgress('')
              setUserAvtar(userData?.image);
              toast.error(error.message);          
            }
        }
  }

  const openModal=()=>setIsModalVisible(true)
  const closeModal=()=>setIsModalVisible(false)

  // handle when user edit profile data
  const handleChange=(e)=>{
    setFormData((prevData)=>({...prevData,[e.target.name]:e.target.value}))  
  }

  // validate form Data
  const validateForm=()=>{
      let newErrors={};

      if(!formData.firstName || !formData.firstName.trim()){
        newErrors.firstName="First Name is required"
      }
      if(!formData.lastName || !formData.lastName.trim()){
        newErrors.lastName="Last Name is required"
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length===0;
   }

  // handle when user submit modified profile data 
  const handleSubmit=async(e)=>{  
       e.preventDefault();
       const isValid=validateForm();
       
       if(isValid){
            try{
                await userService.updateProfile(userData._id,formData)
                    .then((res)=>{
                        dispatch(login(res.data.updatedUser));
                        toast.success(res.data.message)
                        closeModal();         
                    })
            }
            catch(error){
            toast.error(error.message)
            }
       }

  }

  return (

        <div className="min-h-screen flex flex-col justify-center items-center px-[1rem] md:px-[2rem]">

            <div className='w-full max-w-md mx-auto  my-[5.5rem] bg-white dark:bg-slate-700 text-center rounded-md py-7 shadow-lg'>
                {/* title */}
                <p className='text-lg font-semibold text-center'>My Profile</p>
               
                {/* profile picture */}
                <div className='relative'>
                    <img src={userAvtar} alt="profile_img"  className={`${uploadProgress?'opacity-50':''} mt-3 rounded-full w-[90px] h-[90px] object-cover max-w-[95px] max-h-[95px] mx-auto`} />
                    {!uploadProgress&&<Button onClick={()=>avtar.current.click()} className='absolute top-[3.5rem] left-[54.1%] !p-[0.4rem] !rounded-full text-[0.95rem] bg-lightPrimary w-fit mt-1'><BiCamera className='text-white'></BiCamera></Button>}
                </div>
                
                {/* uploading status text*/}
                {uploadProgress &&<p className='text-secondary dark:text-gray-200 text-sm mt-2'>Uploading...{uploadProgress}%</p>}
               
                <form action="#">
                    <input ref={avtar} onChange={handleFileChange} name='image' type='file' className='hidden'></input>
                </form> 
            
                <div className="text-right mt-3 mr-10">
                    <button onClick={openModal} title='Edit Profile' className='text-white bg-blue-600 opacity-90 hover:bg-blue-700 duration-200 rounded-[4px] text-[0.75rem] px-[0.6rem] py-[0.28rem] mr-2'><BiEdit title='Edit Profile' className="inline-block mt-[-2px]"></BiEdit></button>       
                    <button onClick={()=>navigate(`/blogs/author/${userData._id}`)} title='My Posts' className='text-white bg-lightPrimary hover:bg-primary duration-200 rounded-[4px] text-[0.75rem] px-[0.6rem] py-[0.28rem]'><FaRectangleList title='My Posts' className="inline-block mt-[-2px]"></FaRectangleList></button>
                </div>
                 
                 {/* profile data table  */}
                <div className='overflow-x-scroll px-3'>
                    <table className='mx-auto mt-5 text-sm'>
                        <tbody className='dark:text-white'>
                            <tr>
                                <th>First Name</th>
                                <td className='capitalize'>{userData?.firstName}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td className='capitalize'>{userData?.lastName}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{userData?.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* profile data edit modal */}
            <Modal title="Update Profile" modalType='static' isVisible={isModalVisible} closeModal={closeModal} width='max-w-md'>
                    <form action="#" className='max-w-64 mx-auto'>
                        <div className='mt-2.5'>
                            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className={`${errors?.firstName&&'border-[1.5px] border-red-500'}`}></Input>
                            {errors?.firstName&& <span className="text-red-500">{errors.firstName}</span>}
                        </div>

                        <div className='mt-2.5'>
                            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className={`${errors?.lastName&&'border-[1.5px] border-red-500'}`}></Input>
                            {errors?.lastName&& <span className="text-red-500">{errors.lastName}</span>}
                        </div>
                    
                        <div className='mt-2.5'>
                            <span className='text-sm'>Email</span>
                            <p aria-readonly className='px-2 py-1 rounded-md text-sm border border-lightBorder bg-[#e9e9e9] dark:bg-gray-300 dark:text-gray-700 cursor-not-allowed'>{userData.email}</p>
                        </div>

                        <div className='text-center mt-5'>
                            <button onClick={handleSubmit} className='py-1.5 px-[1.2rem] text-sm text-white bg-secondary hover:bg-blue-800 duration-300 rounded-md'>Update</button>
                        </div>
                
                    </form>
                    
            </Modal>      

        </div>

  )
}
