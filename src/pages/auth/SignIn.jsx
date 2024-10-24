import {Link, useNavigate} from 'react-router-dom';
import { Button, Input, ContentContainer, MainContainer } from '../../components';
import { CgMail } from 'react-icons/cg';
import { BsKey } from 'react-icons/bs';
import { useState } from 'react';
import authService from '../../services/authService';
import userService from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../redux/authSlice';


export const SignIn=()=>{

    const [formData,setFormData]=useState({email:"",password:""})
    
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const themeMode=useSelector(state=>state.theme.mode);

    const [errors, setErrors]=useState();

    
    // validate email
    const validateEmail=(email)=>{
        const regExp=/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        return regExp.test(email);
    }

    // validate form data
    const validateForm=()=>{
       let newErrors={}

       if(!formData.email||!formData.email.trim()){
         newErrors.email="Email is Required"
       }else if(!validateEmail(formData.email)){
          newErrors.email="Invalid email format"
       }

       if(!formData.password || !formData.password.trim()){
          newErrors.password="Password is required"
       }

       setErrors(newErrors);
       return Object.keys(newErrors).length===0;
    }

    const handleChange=(e)=>{
        setFormData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
      
        const isValid=validateForm();
        
        if(isValid){
            try{
                const session=await authService.signIn(formData);
                if(session){
                    toast.success(session.data.message);
                    userService.getCurrentUser().then((res)=>{
                        if(res){
                            dispatch(login(res.data.data)); 
                            navigate("/");                      
                        }                  
                    });
                }       
            
            }
            catch(error){
              toast.error(error.message||"An error occurred during sign in")
            }
        }
    }

    return (
    
        <div className='min-h-screen flex flex-col justify-center items-center pt-[6rem] pb-[3rem] px-[1rem] md:px-[2rem]'>                    
            <div className="max-w-[40rem] flex gap-4 justify-between items-center py-12 px-3 md:px-6 shadow-2xl bg-white dark:bg-slate-700 rounded-md">
                            {/* image section */}
                            <div className='hidden md:block'>
                                <img src={themeMode==="light"?"/assets/images/signIn-min.png":"/assets/images/signIn-dark.png"} alt="SignUpImage"  className='max-w-[18rem] pt-2 object-cover' />
                            </div>

                            {/* form section */}
                            <div className='max-w-full mx-auto px-7'>
                                <h1 className='text-[1.2rem] font-semibold text-center mb-3'>Sign In</h1>
                                <form action="#" >

                                    <div>
                                        <div className='relative mt-3'>
                                            <Input  name="email" value={formData.email} onChange={handleChange}  placeholder="Email" padding="px-[2.6rem] pr-5" className={`${errors?.email&&'border-[1.5px] border-red-500'}`}></Input>
                                            <div className='icon absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500 dark:text-gray-300 dark:border-gray-300'><CgMail></CgMail></div>      
                                        </div>
                                        {errors?.email&&<div className='text text-red-500 -mb-1'>{errors.email}</div>}
                                    </div>

                                    <div> 
                                        <div className='relative mt-3'>
                                            <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" autocomplete="new-password" padding="px-[2.6rem] pr-5" className={`${errors?.password&&'border-[1.5px] border-red-500'}`}></Input>
                                            <div className='icon absolute left-1 top-1/2 -translate-y-1/2 px-[0.4rem] text-lightBorder border-r-[0.1rem] border-gray-500 dark:text-gray-300 dark:border-gray-300'><BsKey className='rotate-[145deg]'></BsKey></div>
                                        </div>
                                        {errors?.password&&<div className='text text-red-500'>{errors.password}</div>}
                                    </div>
                                   

                                    {/* <div className='relative mt-3'>
                                        <Input name='test' value={formData.test} onChange={handleChange} className='border border-red-800 peer' type="text" />
                                        <label htmlFor="test" className={`absolute left-3 bg-white px-1  text-gray-400 font-thin text-sm -translate-y-1/2 peer-focus:top-0 peer-focus:text-xs peer-focus:text-lightPrimary  duration-300 ${formData.test!=''?"top-0":"top-1/2"}`}>Test</label>        
                                    </div> */}
                                    
                                
                                    <div className='text-center'>
                                        <Button type="submit" onClick={handleSubmit} className='bg-lightPrimary hover:bg-primary dark:bg-primary dark:hover:bg-lightPrimary duration-300 text-white mt-5'>Sign In</Button>
                                    </div>
                                    
                                
                                    <p className='mt-7 text-sm text-center text-secondary'><Link to="/forgot_password" className='text-secondary dark:text-gray-200'>Forgot password ?</Link></p>
                                    <p className='mt-2 text-sm text-center'>Don't You have an account ?<Link to="/sign_up" className='text-secondary dark:text-gray-200 ml-1 font-semibold tracking-[0.15px]'>Sign Up</Link></p>
                                                                                                    
                                </form>

                            </div>
                        </div>
                        </div>
    )
}