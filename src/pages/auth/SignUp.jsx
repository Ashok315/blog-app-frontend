import {Link, useNavigate} from 'react-router-dom'
import { Button, Input, ContentContainer, MainContainer } from '../../components'
import { BiLock, BiLockOpen, BiUserCircle } from 'react-icons/bi'
import { CgMail } from 'react-icons/cg'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import authService from '../../services/authService'


export const SignUp=()=>{
   
    const [formData,setFormData]=useState({firstName:"",lastName:"",email:"",password:""})
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate=useNavigate()


const handleChange=(e)=>{ 
   setFormData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
}


const handleSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try{
        const response=await authService.signUp(formData)
        // .then((res)=>res);
        if(response){
            setSuccess('Registration successful!');
            navigate('/sign_in')
        }
        console.log(response)  
    
    }catch(err){
        setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
}

  return (
        <div className='mt-auto'>
            <MainContainer>
                <ContentContainer>
                    <div className="max-w-[41rem] flex gap-4 mx-auto justify-between items-center py-8 px-3 md:px-7 shadow-2xl bg-white rounded-md">
                        {/* image section */}
                        <div className='hidden md:block'>
                            <img src="/assets/images/signUp.png" alt="SignUpImage"  className='max-w-[17rem] pt-2 object-cover' />
                        </div>

                        {/* form section */}
                        <div className='max-w-full mx-auto'>
                            <h1 className='text-[1.2rem] font-semibold text-center mb-3'>Sign Up</h1>
                            <form action="" className=''>
                                <div className='relative mt-3'>
                                    <Input name="firstName" value={formData.firstName}  onChange={handleChange} placeholder="First Name" padding="px-[2.6rem] pr-5"></Input>
                                    <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BiUserCircle></BiUserCircle></span>
                                </div>
                                <div className='relative mt-2.5'>
                                    <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" padding="px-[2.6rem] pr-5"></Input>
                                    <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BiUserCircle></BiUserCircle></span>
                                </div>
                                <div className='relative mt-2.5'>
                                    <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" padding="px-[2.6rem] pr-5"></Input>
                                    <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><CgMail></CgMail></span>
                                </div>
                                <div className='relative mt-2.5'>
                                    <Input name="password" value={formData.password} onChange={handleChange} placeholder="Create Password" padding="px-[2.6rem] pr-5"></Input>
                                    <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BiLockOpen></BiLockOpen></span>
                                </div>
                                <div className='relative mt-2.5'>
                                    <Input name="confirmPassword" placeholder="Confirm Password" padding="px-[2.6rem] pr-5"></Input>
                                    <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BiLock></BiLock></span>
                                </div>
                            
                            
                                <div className='text-center'>
                                     <Button type='submit' onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary duration-300 text-white mt-4'>{loading?"Loading...":"Sign Up"}</Button>
                                </div>

                                <p className='mt-5 text-sm text-center'>Already have an account ?<Link to="/sign_in" className='text-secondary ml-1 font-semibold tracking-[0.15px]'>Sign In</Link></p>
                                
                                <div className='mt-3 flex items-center max-w-full mx-auto  justify-center'>
                                    <span className='border border-gray-600 w-full h-0'></span>
                                    <span className='px-3'>Or</span>
                                    <span className='border border-gray-600 w-full h-0'></span>
                                </div>
                                <p className='text-sm text-center border border-gray-600 rounded-full py-1 mt-3 cursor-pointer'><FcGoogle className='inline-block text-lg mx-1 mt-[-0.13rem]'/> Continue with Google</p>
                            </form>
                            {error && <div className="error-message">{error}</div>}
                            {success && <div className="success-message">{success}</div>}
                        
                            
                        </div>
                    </div>
                </ContentContainer>
            </MainContainer>
        </div>
  )
}