import React from 'react'
import { Link } from 'react-router-dom'
import lightLogo from '../../assets/images/lightLogo.svg'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter, BsTwitterX } from 'react-icons/bs'

export const Footer = () => {
  return (
    <footer className='bg-secondary mt-auto'>
        <div className='flex flex-col gap-5 md:flex-row md:gap-3 justify-evenly items-center px-3  text-slate-200 py-5'>
            <div className=''>
                    <ul className='flex justify-center'> 
                        <li className='leading-6 mt-1'><Link to="/"  className="block rounded  hover:bg-lightPrimary duration-300 p-1 mx-1"><BsGithub></BsGithub></Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className="block rounded  hover:bg-lightPrimary duraton-300 p-1 mx-1"><BsLinkedin></BsLinkedin></Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className="block rounded  hover:bg-lightPrimary duraton-300 p-1 mx-1"><BsInstagram></BsInstagram></Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className="block rounded  hover:bg-lightPrimary duration-300 p-1 mx-1"><BsFacebook></BsFacebook></Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className="block rounded  hover:bg-lightPrimary duration-300 p-1 mx-1"><BsTwitterX></BsTwitterX></Link></li>
                    </ul>
            </div>

            <div>
                    <ul className='md:flex justify-center text-[0.9rem] text-center'> 
                        <li className='leading-6 mt-1'><Link to="/"  className=" border-b-2 border-transparent hover:border-primary duration-300 mx-2 pb-1">Education</Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className=" border-b-2 border-transparent hover:border-primary duraton-300  mx-2 pb-1">Technology</Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className=" border-b-2 border-transparent hover:border-primary duraton-300  mx-2 pb-1">Business</Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className=" border-b-2 border-transparent hover:border-primary duration-300 mx-2 pb-1">Travel</Link></li>
                        <li className='leading-6 mt-1'><Link to="/test" className=" border-b-2 border-transparent hover:border-primary duration-300 mx-2 pb-1">Finance</Link></li>
                    </ul>
            </div>

            <div className=''>
                <Link to="/" className=''><img src={lightLogo} className='max-w-[83px] md:max-w-[92px] mx-auto' alt="logo" /></Link> 
            </div>
           
        </div>
        
         <hr className='opacity-70'/>
         <p className='p-3 text-center text-white opacity-60 text-sm'>Copyright <span>&#169;</span> 2024 MyBlog | All rights reserved | Developed by: Ashok Pateliya</p>
    </footer>
  )
}
