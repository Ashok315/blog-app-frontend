import React, { useRef,useState } from 'react'
import { Button, ContentContainer, Input, MainContainer, Modal } from '../../components'
import { BiEdit} from 'react-icons/bi'
import { FaRectangleList } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../../services/userService'
import {login} from '../../redux/authSlice'
import "./Profile.css"
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
 
  const userData=useSelector(state=>state.auth.user);
  const avtar=useRef();

  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const [userAvtar,setUserAvtar]=useState(userData?.image)
  const [uploadProgress,setUploadProgress]=useState()

  const [isModalVisible,setIsModalVisible]=useState(false);
  const [formData,setFormData]=useState({firstName:userData.firstName,lastName:userData.lastName});


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
                await userService.updateProfileImage(userData._id, profileImage, updateProgressStatus,{ showSpinner: false })
                          .then((res)=>{
                              dispatch(login(res.data.updatedUser))
                              setUploadProgress('')
                          })
            }
            catch(error){
              setUploadProgress('')
              setUserAvtar(userData?.image);
              throw new Error(error.message)           
            }
        }
  }

  const openModal=()=>setIsModalVisible(true)
  const closeModal=()=>setIsModalVisible(false)

  // handle when user edit profile data
  const handleChange=(e)=>{
    setFormData((prevData)=>({...prevData,[e.target.name]:e.target.value}))  
  }

  // handle when user submit modified data
  const handleSubmit=async(e)=>{  
       e.preventDefault();
       try{
              await userService.updateProfile(userData._id,formData)
                    .then((res)=>{
                      dispatch(login(res.data.updatedUser));
                      closeModal();         
                    })
         }
       catch(error){
         throw new Error(error.message)
       }

  }

  return (
    <>
      <div className='mt-auto'>
          <MainContainer>
              <ContentContainer width='max-w-xl'>

                <div className='bg-white text-center rounded-md py-7 shadow-lg'>
                    <p className='text-lg font-semibold text-center'>My Profile</p>
                    <img src={userAvtar} alt="profile_img"  className={`${uploadProgress?'opacity-50':''} mt-3 rounded-full w-[75px] h-[75px] object-cover max-w-[80px] max-h-[80px] mx-auto`} />
                    <Button onClick={()=>avtar.current.click()} className='text-[0.79rem] text-secondary mt-1'>{!uploadProgress&&'Edit picture'}</Button>
                    {uploadProgress &&<p className='text-secondary text-sm -mt-3'>Uploading...{uploadProgress}%</p>}
                    <form action="#">
                        <input ref={avtar} onChange={handleFileChange} name='image' type='file' className='hidden'></input>
                    </form> 
                  
                    <div className="text-right mt-3 mr-10">
                          <button onClick={openModal} title='Edit Profile' className='text-white bg-blue-600 opacity-90 hover:bg-blue-700 duration-200 rounded-[4px] text-[0.75rem] px-[0.6rem] py-[0.28rem] mr-2'><BiEdit title='Edit Profile' className="inline-block mt-[-2px]"></BiEdit></button>       
                          <button onClick={()=>navigate(`/blogs/author/${userData._id}`)} title='My Posts' className='text-white bg-lightPrimary hover:bg-primary duration-200 rounded-[4px] text-[0.75rem] px-[0.6rem] py-[0.28rem]'><FaRectangleList title='My Posts' className="inline-block mt-[-2px]"></FaRectangleList></button>
                    </div>

                    <div className='overflow-x-scroll px-3'>
                        <table className='mx-auto mt-5 text-sm'>
                            <tbody>
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

                <Modal title="Update Profile" modalType='static' isVisible={isModalVisible} closeModal={closeModal} width='max-w-md'>
                        <form action="#" className='max-w-64 mx-auto'>
                              <div className='mt-2.5'>
                                  <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="rounded-md mt-1"></Input>
                              </div>
                              <div className='mt-2.5'>
                                  <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className="rounded-md"></Input>
                              </div>
                          
                              <div className='mt-2.5'>
                                  <span className='text-sm'>Email</span>
                                  <p aria-readonly className='px-2 py-1 rounded-md text-sm border border-lightBorder bg-[#e9e9e9]'>{userData.email}</p>
                              </div>

                              <div className='text-center mt-5'>
                                  <button onClick={handleSubmit} className='py-1.5 px-[1.2rem] text-sm text-white bg-secondary hover:bg-blue-800 duration-300 rounded-md'>Update</button>
                              </div>
                    
                        </form>
                        
                </Modal>      

              </ContentContainer>
          </MainContainer>     
      </div>
     </>
  )
}
