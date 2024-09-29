import {Link, useNavigate} from 'react-router-dom'
import { Button, Input, ContentContainer, MainContainer } from '../../components'
import { CgMail } from 'react-icons/cg'
import { FcGoogle } from 'react-icons/fc'
import { BsKey } from 'react-icons/bs'
import { useState } from 'react'
import authService from '../../services/authService'
import userService from '../../services/userService'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/authSlice'

export const SignIn=()=>{

    const [formData,setFormData]=useState({email:"",password:""})

    const [loading,setLoading]=useState(false)
    const [success,setSuccess]=useState(null)
    const [error,setError]=useState(null)
    
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleChange=(e)=>{
        setFormData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const session=await authService.signIn(formData).then(res=>res);
            if(session){
                 userService.getCurrentUser().then((res)=>{
                    if(res){
                        dispatch(login(res.data.data)); 
                        navigate("/");                      
                    }                  
                });
            }       
           
        }
        catch(error){
           setError(error.message||"An error occurred during sign in")
        }
        finally{
            setLoading(false);
        }
   

    }

    return (
    
          <div className='mt-auto'>
                <MainContainer>
                    <ContentContainer>
                        <div className="max-w-[41rem] flex gap-4 mx-auto justify-between items-center py-12 px-3 md:px-6 shadow-2xl bg-white rounded-md">
                            {/* image section */}
                            <div className='hidden md:block'>
                                <img src="/assets/images/signIn-min.png" alt="SignUpImage"  className='max-w-[18rem] pt-2 object-cover' />
                            </div>

                            {/* form section */}
                            <div className='max-w-full mx-auto'>
                                <h1 className='text-[1.2rem] font-semibold text-center mb-3'>Sign In</h1>
                                <form action="#" className=''>

                                    <div className='relative mt-3'>
                                        <Input  name="email" value={formData.email} onChange={handleChange}  placeholder="Email" padding="px-[2.6rem] pr-5"></Input>
                                        <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><CgMail></CgMail></span>
                                    </div>
                                    <div className='relative mt-3'>
                                        <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" padding="px-[2.6rem] pr-5"></Input>
                                        <span className='absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500'><BsKey className='rotate-[145deg]'></BsKey></span>
                                    </div>

                                    {/* <div className='relative mt-3'>
                                        <Input name='test' value={formData.test} onChange={handleChange} className='border border-red-800 peer' type="text" />
                                        <label htmlFor="test" className={`absolute left-3 bg-white px-1  text-gray-400 font-thin text-sm -translate-y-1/2 peer-focus:top-0 peer-focus:text-xs peer-focus:text-lightPrimary  duration-300 ${formData.test!=''?"top-0":"top-1/2"}`}>Test</label>        
                                    </div> */}
                                    
                                
                                    <div className='text-center'>
                                        <Button type="submit" onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary duration-300 text-white mt-5'>Sign In</Button>
                                    </div>
                                    
                                
                                    <p className='mt-7 text-sm text-center text-secondary'><Link to="" className='text-secondary'>Forgot password ?</Link></p>
                                    <p className='mt-2 text-sm text-center'>Don't You have an account ?<Link to="/sign_up" className='text-secondary ml-1 font-semibold tracking-[0.15px]'>Sign Up</Link></p>
                                    
                                    <div className='mt-3 flex items-center max-w-full mx-auto  justify-center'>
                                        <span className='border border-gray-600 w-full h-0'></span>
                                        <span className='px-3'>Or</span>
                                        <span className='border border-gray-600 w-full h-0'></span>
                                    </div>
                                    
                                    <div className='text-center'>
                                       <button className='text-sm border border-gray-600 rounded-md px-4 py-1 mt-3'><FcGoogle className='inline-block text-lg mx-1 mt-[-0.13rem]'/> Continue with Google</button>
                                    </div>
                                    
                                </form>

                                {success&& <div>{success}</div>}
                                {error&& <div>{error}</div>}
                            </div>
                        </div>
                    </ContentContainer>
                </MainContainer>
          </div>
    )
}