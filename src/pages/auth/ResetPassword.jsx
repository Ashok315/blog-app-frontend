import React, { useRef, useState } from 'react'
import { Button, ContentContainer, Input, MainContainer } from '../../components';
import { BiLock, BiLockOpen } from 'react-icons/bi';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import { useNavigate, useParams } from 'react-router-dom';

export const ResetPassword = () => {
    const [newPassword, setNewPassword]=useState("");
    let confirmNewPasswordRef=useRef();
    const [errors, setErrors]=useState();
    const {token}=useParams();
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setNewPassword(e.target.value)
    }

    // validate form data
    const validateForm=()=>{
       let newErrors={}

       if(!newPassword || !newPassword.trim()){
         newErrors.newPassword="New Password is Required"
       }
       if(!confirmNewPasswordRef.current.value || !confirmNewPasswordRef.current.value.trim()){
        newErrors.confirmNewPassword="Confirm Password is required"
        }else if(newPassword!==confirmNewPasswordRef.current.value){
           newErrors.confirmNewPassword="Confirm Password is not matched with New Password"
        }
   
       setErrors(newErrors);
       return Object.keys(newErrors).length===0;
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        let isValid=validateForm();

        if(isValid){
            try {
                await authService.resetPassword(token,{newPassword}).then((res)=>{
                    toast.success(res.data.message);
                    navigate("/sign_in")
                });
          
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

  return (

            <div className="min-h-screen flex flex-col justify-center items-center pt-[6rem] pb-[3rem] px-[1rem] md:px-[2rem]">
                <div className="max-w-[23rem] py-12 px-3 md:px-6 shadow-2xl bg-white dark:bg-slate-700 rounded-md">
            
                    {/* form section */}
                    <div className='max-w-full mx-auto px-10'>
                        <h1 className='text-[1.2rem] font-semibold text-center mb-1'>Reset Password</h1>
                        <form>
                            
                            <div>
                                <div className='relative mt-2.5'>
                                    <Input name="password" value={newPassword} onChange={handleChange} placeholder="New Password" padding="px-[2.6rem] pr-5" className={`${errors?.newPassword&&'border-[1.5px] border-red-500'}`}></Input>
                                    <div className='icon absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500 dark:text-gray-300 dark:border-gray-300'><BiLockOpen></BiLockOpen></div>
                                </div>
                                {errors?.newPassword&&<div className='text text-red-500 -mb-1'>{errors.newPassword}</div>}
                            </div>
                            
                            <div>
                                <div className='relative mt-2.5'>
                                    <Input ref={confirmNewPasswordRef} type="password" name="confirmPassword" placeholder="Confirm New Password" autocomplete="new-password" padding="px-[2.6rem] pr-5" className={`${errors?.confirmNewPassword&&'border-[1.5px] border-red-500'}`}></Input>
                                    <div className='icon absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500 dark:text-gray-300 dark:border-gray-300'><BiLock></BiLock></div>
                                </div>
                                {errors?.confirmNewPassword&&<div className='text text-red-500 -mb-1'>{errors.confirmNewPassword}</div>}
                            </div>

                        
                            <div className='text-center'>
                                <Button onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary dark:bg-primary dark:hover:bg-lightPrimary duration-300 text-white mt-4'>Submit</Button>
                            </div>
                            
                                                                                            
                        </form>

                    </div>
                </div>
            </div>
  )
}
