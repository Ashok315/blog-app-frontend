import {Link, useNavigate} from 'react-router-dom'
import { Button, Input, ContentContainer, MainContainer } from '../../components'
import { BiLock, BiLockOpen, BiUserCircle } from 'react-icons/bi'
import { CgMail } from 'react-icons/cg'
import { FcGoogle } from 'react-icons/fc'
import { useRef, useState } from 'react'
import authService from '../../services/authService'
import { toast } from 'react-toastify'


export const SignUp=()=>{
   
    const [formData,setFormData]=useState({firstName:"",lastName:"",email:"",password:""}) 
    const navigate=useNavigate()
    let confirmPasswordRef=useRef();

    const handleChange=(e)=>{ 
    setFormData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
    }

    const [errors, setErrors]=useState();
    
    // validate email
    const validateEmail=(email)=>{
        const regExp=/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        return regExp.test(email);
    }

    // validate form Data
    const validateForm=()=>{
       let newErrors={}

       if(!formData.firstName|| !formData.firstName.trim()){
         newErrors.firstName="FirstName is Required"
       }
       if(!formData.lastName|| !formData.lastName.trim()){
        newErrors.lastName="LastName is Required"
      }
      
       if(!formData.email||!formData.email.trim()){
         newErrors.email="Email is Required"
       }else if(!validateEmail(formData.email)){
          newErrors.email="Invalid email format"
       }

       if(!formData.password || !formData.password.trim()){
          newErrors.password="Password is required"
       }
       if(!confirmPasswordRef.current.value || !confirmPasswordRef.current.value.trim()){
        newErrors.confirmPassword="Confirm Password is required"
        }else if(formData.password!==confirmPasswordRef.current.value){
           newErrors.confirmPassword="Confirm Password is not matched with Password"
        }

       setErrors(newErrors);
       return Object.keys(newErrors).length===0;
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const isValid=validateForm();

        if(isValid){
            try{
                const response=await authService.signUp(formData);
                if(response){
                    toast.success(response.data.message);
                    navigate('/sign_in')
                }
            
            }catch(err){
                toast.error(err.message|| 'An error occurred during registration.')
            } 
        }
    }

  return (
        <div className='mt-auto'>
            <MainContainer>
                <ContentContainer>
                    <div className="max-w-[41rem] flex gap-4 mx-auto justify-between items-center py-8 px-3 md:px-7 shadow-2xl bg-white rounded-md">
                        {/* image section */}
                        <div className='hidden md:block'>
                            <img src="/assets/images/signUp-min.png" alt="SignUpImage"  className='max-w-[17rem] pt-2 object-cover' />
                        </div>

                        {/* form section */}
                        <div className='max-w-full mx-auto'>
                            <h1 className='text-[1.2rem] font-semibold text-center mb-3'>Sign Up</h1>
                            <form action="" className=''>

                                <div>
                                    <div className='relative mt-3'>
                                        <Input name="firstName" value={formData.firstName}  onChange={handleChange} placeholder="First Name" padding="px-[2.6rem] pr-5" className={`${errors?.firstName&&'border-[1.5px] border-red-500'}`}></Input>
                                        <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BiUserCircle></BiUserCircle></span>
                                    </div>
                                    {errors?.firstName&&<div className='text text-red-500 -mb-1'>{errors.firstName}</div>}
                                </div>
                              
                                <div>
                                    <div className='relative mt-2.5'>
                                        <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" padding="px-[2.6rem] pr-5" className={`${errors?.lastName&&'border-[1.5px] border-red-500'}`}></Input>
                                        <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BiUserCircle></BiUserCircle></span>
                                    </div>
                                    {errors?.lastName&&<div className='text text-red-500 -mb-1'>{errors.lastName}</div>}
                                </div>
                                
                                <div>
                                    <div className='relative mt-2.5'>
                                        <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" padding="px-[2.6rem] pr-5" className={`${errors?.email&&'border-[1.5px] border-red-500'}`}></Input>
                                        <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><CgMail></CgMail></span>
                                    </div>
                                    {errors?.email&&<div className='text text-red-500 -mb-1'>{errors.email}</div>}
                                </div>

                                <div>
                                    <div className='relative mt-2.5'>
                                        <Input name="password" value={formData.password} onChange={handleChange} placeholder="Create Password" padding="px-[2.6rem] pr-5" className={`${errors?.password&&'border-[1.5px] border-red-500'}`}></Input>
                                        <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BiLockOpen></BiLockOpen></span>
                                    </div>
                                    {errors?.password&&<div className='text text-red-500 -mb-1'>{errors.password}</div>}
                                </div>
                               
                                <div>
                                    <div className='relative mt-2.5'>
                                        <Input ref={confirmPasswordRef} name="confirmPassword" placeholder="Confirm Password" padding="px-[2.6rem] pr-5" className={`${errors?.confirmPassword&&'border-[1.5px] border-red-500'}`}></Input>
                                        <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BiLock></BiLock></span>
                                    </div>
                                    {errors?.confirmPassword&&<div className='text text-red-500 -mb-1'>{errors.confirmPassword}</div>}
                                </div>
                                 
                                <div className='text-center'>
                                     <Button type='submit' onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary duration-300 text-white mt-4'>Sign Up</Button>
                                </div>

                                <p className='mt-5 text-sm text-center'>Already have an account ?<Link to="/sign_in" className='text-secondary ml-1 font-semibold tracking-[0.15px]'>Sign In</Link></p>
                                
                                <div className='mt-3 flex items-center max-w-full mx-auto  justify-center'>
                                    <span className='border border-gray-600 w-full h-0'></span>
                                    <span className='px-3'>Or</span>
                                    <span className='border border-gray-600 w-full h-0'></span>
                                </div>

                                <div className='text-center'>
                                    <button className='text-sm border border-gray-600 rounded-md px-4 py-1 mt-3'><FcGoogle className='inline-block text-lg mx-1 mt-[-0.13rem]'/> Continue with Google</button>
                                </div>
                            </form>
             
                        </div>
                    </div>
                </ContentContainer>
            </MainContainer>
        </div>
  )
}