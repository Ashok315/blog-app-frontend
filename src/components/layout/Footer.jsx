import React from 'react'
import { Link } from 'react-router-dom'
import lightLogo from '../../assets/images/lightLogo.svg'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from 'react-icons/bs'
import { ContentContainer } from './ContentContainer'

export const Footer = () => {
  return (
    <footer className='bg-secondary w-full mt-auto min-h-[100px]'>
        <ContentContainer className='flex flex-col gap-5 md:flex-row md:gap-3 justify-evenly items-center px-3 text-slate-200 py-5'>
           
            {/* social-media links */}
            <div>
                    <ul className='flex justify-center items-center'> 
                        <li className='leading-6 mt-1'><Link to="/"  className="block rounded  hover:bg-lightPrimary duration-300 p-1 mx-1"><BsGithub></BsGithub></Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className="block rounded  hover:bg-lightPrimary duraton-300 p-1 mx-1"><BsLinkedin></BsLinkedin></Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className="block rounded  hover:bg-lightPrimary duraton-300 p-1 mx-1"><BsInstagram></BsInstagram></Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className="block rounded  hover:bg-lightPrimary duration-300 p-1 mx-1"><BsFacebook></BsFacebook></Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className="block rounded  hover:bg-lightPrimary duration-300 p-1 mx-1"><BsTwitterX></BsTwitterX></Link></li>
                    </ul>
            </div>
            
            {/* categories links */}
            <div>
                    <ul className='md:flex justify-center items-center text-[0.9rem] text-center'> 
                        <li className='leading-6 mt-1'><Link to="/"  className=" border-b-2 border-transparent hover:border-primary duration-300 mx-2 pb-1">Education</Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className=" border-b-2 border-transparent hover:border-primary duraton-300  mx-2 pb-1">Technology</Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className=" border-b-2 border-transparent hover:border-primary duraton-300  mx-2 pb-1">Business</Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className=" border-b-2 border-transparent hover:border-primary duration-300 mx-2 pb-1">Travel</Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className=" border-b-2 border-transparent hover:border-primary duration-300 mx-2 pb-1">Finance</Link></li>
                    </ul>
            </div>
                
            {/* logo */}
            <div>
                <Link to="/" className=''><img src={lightLogo} className='max-w-[83px] md:max-w-[92px] mx-auto' alt="logo" /></Link> 
            </div>
           
        </ContentContainer>

        <hr className='opacity-70'/>    
     
         {/* copyright text */}
         <div className='text-center'>
             <p className='p-3 text-white opacity-60 text-sm'>Copyright <span>&#169;</span> 2024 MyBlog | All rights reserved | Developed by: Ashok Pateliya</p>
         </div>
    </footer>
  )
}
