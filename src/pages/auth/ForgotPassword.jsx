import React, { useState } from 'react'
import { Button, ContentContainer, Input, MainContainer } from '../../components'
import { CgMail } from 'react-icons/cg';
import authService from '../../services/authService';
import { toast } from 'react-toastify';

export const ForgotPassword = () => {
    const [email, setEmail]=useState('');
    const [errors, setErrors]=useState();

    const handleChange=(e)=>{
        setEmail(e.target.value)
    }

      // validate email
      const validateEmail=(email)=>{
        const regExp=/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        return regExp.test(email);
    }

    // validate form data
    const validateForm=()=>{
       let newErrors={}

       if(!email || !email.trim()){
         newErrors.email="Email is Required"
       }else if(!validateEmail(email)){
          newErrors.email="Invalid email format"
       }

       setErrors(newErrors);
       return Object.keys(newErrors).length===0;
    }

    const handleSubmit=async (e)=>{
         e.preventDefault();

        let isValid=validateForm();

        if(isValid){
            try {
                const response=await authService.forgotPassword({email});
                if(response){
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }


    
  return (
    <div className='mt-auto'>
        <MainContainer>
            <ContentContainer>
                <div className="max-w-[25rem] mx-auto py-12 px-3 md:px-6 shadow-2xl bg-white rounded-md">
            
                    {/* form section */}
                    <div className='max-w-full mx-auto px-10'>
                        <h1 className='text-[1.2rem] font-semibold text-center mb-1'>Forgot Password ?</h1>
                        <p className='text-center text-xs'>Enter the email address to get link reset your password</p>
                        <form action="#" >
                            <div>
                                <div className='relative mt-6'>
                                        <Input  name="email" value={email} onChange={handleChange}  placeholder="Email" padding="px-[2.6rem] pr-5" className={`${errors?.email&&'border-[1.5px] border-red-500'}`}></Input>
                                        <div className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><CgMail></CgMail></div>      
                                    </div>
                                    {errors?.email&&<div className='text text-red-500 -mb-1'>{errors.email}</div>}
                            </div>

                        
                            <div className='text-center'>
                                <Button type="submit" onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary duration-300 text-white mt-4'>Send</Button>
                            </div>
                            
                                                                                            
                        </form>

                    </div>
                </div>
            </ContentContainer>
        </MainContainer>
    </div>
  )
}
