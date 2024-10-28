import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo.svg'
import { FaBars, FaRectangleList } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { Button } from '../common/Button'
import { BsSearch } from 'react-icons/bs'
import { HiOutlineMoon } from 'react-icons/hi'
import { IoMdArrowDropdown, IoMdLogOut } from 'react-icons/io'
import { Input } from '../common/Input'
import {PiUserCircleFill} from 'react-icons/pi'
import { RiAddCircleFill } from 'react-icons/ri'
import { ContentContainer } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../services/authService'
import { logout } from '../../redux/authSlice'
import { toast } from 'react-toastify'
import { BiSun } from 'react-icons/bi';
import { themeToggle } from '../../redux/themeSlice'

export const Header = () => {

  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
  const userData=useSelector(state=>state.auth.user);

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const themeMode=useSelector(state=>state.theme.mode);

  const location=useLocation();
  
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const [isProfileTabOpen,setIsProfileTabOpen]=useState(false);
  const profileMenuRef=useRef(null);
 
  const [searchText,setSearchText]=useState('');
  
  //handle toggle Navbar
  const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen);
  }

  //handle profile tab toggle
  const toggleProfileTag=()=>{
        setIsProfileTabOpen(!isProfileTabOpen);
  }

  //handle signout
  const handleSignOut=()=>{
          authService.logout().then(()=>{
            dispatch(logout());
            navigate("/sign_in");   
            toast.success('Logged out successfully!')
       })     
  }

  //handle when search value change
  const handleChange=(e)=>{
    setSearchText(e.target.value)
  }

  //handle search bar
  const handleSearch=(e)=>{
      e.preventDefault();
      if(searchText) navigate(`/blogs/search/${searchText}`)     
  }

  useEffect(()=>{
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
              setIsProfileTabOpen(false);
            }    
        }   
        
        //update search value in search box
        if (location.pathname !==  `/blogs/search/${searchText}`) {
          setSearchText('');
        }

          // handle click outside()
          document.addEventListener('mousedown',handleClickOutside);
          return ()=>document.removeEventListener('mousedown',handleClickOutside)
  },[location])

  return ( 
      <nav className='bg-white dark:bg-slate-800 py-[0.55rem] fixed top-0 w-full z-[70]'>
        <ContentContainer className='flex gap-3 justify-between items-center'>
            {/* logo */}
            <div className='dark:brightness-[1.20] contrast-[0.85]'>
              <Link to="/" aria-label='Go to homepage'><img src={logo} className='w-[90px] h-auto max-w-[85px] md:max-w-[95px]' alt="logo" /></Link> 
            </div>

            {/* searchBar */}  
            <div className='relative text-sm lg:ml-6'>
                <form action="#"  onSubmit={handleSearch}>
                    <Input placeholder="Search" name="search" value={searchText} onChange={handleChange} className="!h-[1.85rem] dark:bg-slate-700 dark:border-slate-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-400"  padding="!px-4 pr-[2.3rem]"></Input>
                    <BsSearch className='absolute top-2.5 right-4 text-lightBorder dark:text-slate-400'></BsSearch>
                  </form>
            </div>
            
            {/* navLinks */}     
            <ul className='hidden md:flex md:gap-5 content-start lg:ml-6 text-[0.88rem] text-gray-700 dark:text-[#b6b8ba] font-semibold tracking-wide'>
                <li><Link to="/" aria-label='home' className={`border-b-2 ${location.pathname=='/'?'border-primary text-black dark:text-white':"border-transparent"} hover:text-black dark:hover:text-white ease-in-out duration-300 pb-1`}>Home</Link></li>
                <li><Link to="/blogs" aria-label='blogs' className={`border-b-2 ${location.pathname=='/blogs'?'border-primary text-black dark:text-white':"border-transparent"} hover:text-black dark:hover:text-white ease-in-out duration-300 pb-1`}>Blogs</Link></li>
                <li><Link to="/about_us" aria-label='about' className={`border-b-2 ${location.pathname=='/about_us'?'border-primary text-black dark:text-white':"border-transparent"} hover:text-black dark:hover:text-white ease-in-out duration-300 pb-1`}>About</Link></li>
            </ul>

            {/* themeButton */}
            <div onClick={()=>dispatch(themeToggle())} role='button' aria-label='theme-mode' className='hidden md:block lg:ml-6 border border-gray-500 rounded-full p-[0.33rem] hover:bg-gray-200 dark:hover:bg-gray-700 duration-200 cursor-pointer'>
                {themeMode==="light"?<HiOutlineMoon className='text-[1rem] text-gray-800'/>
                                    :<BiSun className='text-[1rem] text-gray-800 dark:text-white'/>
                }
            </div>
        
            {isAuthenticated?
                /* profile/auth-section */
                <div ref={profileMenuRef} onClick={toggleProfileTag} className='hidden relative md:flex items-center gap-2 rounded-md py-1 px-4 duration-200 cursor-pointer'>
                    
                    <img src={userData?.image} alt="profile-image" className='w-[30px] h-[30px] max-w-[35px] max-h-[35px] rounded-full' />   
                    <div className='flex item-center gap-1'>
                      <p className='text-[0.8rem] text-gray-600 dark:text-gray-300 font-semibold capitalize'>{userData?.firstName+" "+userData?.lastName}</p>
                      <IoMdArrowDropdown className='text-lg text-gray-600 dark:text-gray-300'/>
                    </div>  

                    <div className={`${!isProfileTabOpen?'hidden':''} absolute bg-white dark:bg-slate-800 w-full py-2 top-10 left-0 rounded-md border border-gray-300 z-10`}>
        
                        <ul className='text-sm text-justify'> 
                            <li className='leading-6'><Link to="/profile" onClick={toggleMenu} aria-label='profile' className="block hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white duration-300 px-3 py-1"><PiUserCircleFill className='text-[0.9rem] inline mr-2 mb-[2px]'/>Profile</Link></li>
                            <li className='leading-6'><Link to="/add_blog" onClick={toggleMenu} aria-label='add blog' className="block  hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white duraton-300 px-3 py-1"><RiAddCircleFill className='text-[0.9rem] inline mr-2 mb-[2px]'/>Add Blog</Link></li>
                            <li className='leading-6'><Link to={`/blogs/author/${userData?._id}`} onClick={toggleMenu} aria-label='my blogs' className="block  hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white duraton-300 px-3 py-1"><FaRectangleList className='text-[0.9rem] inline mr-2 mb-[2px]'/>My Blogs</Link></li>
                            <li className='leading-6'><Link onClick={handleSignOut} aria-label='logout' className="block hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white duration-300 px-3 py-1"><IoMdLogOut className='text-[0.9rem] inline mr-2 mb-[2px]' />Logout</Link></li>
                        </ul>
                    </div>
                </div>
                
              :  
                /* login button */
                <div className='hidden md:block py-1'>
                  <Button type='button' onClick={()=>navigate('/sign_in')} aria-label="login" className='text-white bg-lightPrimary hover:bg-primary dark:bg-primary dark:hover:bg-lightPrimary duration-300'>Sign In</Button>
                </div>
              }
            

            {/* menu-bar button */}
            <div className='md:hidden'>
              <FaBars className='text-4xl mr-[2px] border border-gray-400 rounded px-[0.6rem] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 duration-200' onClick={toggleMenu} />
            </div>
        </ContentContainer>
        
  
        {/* Mobile menu bar */}

          <div className={`md:hidden fixed inset-0 z-10 bg-white dark:bg-slate-800 pt-[0.55rem] px-[1rem] ${!isMenuOpen?'hidden':''}` }>            
              <div className='flex justify-between items-center gap-3 mb-3'>    
                  {/* logo */}
                  <div className='dark:brightness-[1.20] contrast-[0.85]'>
                    <Link to="/" onClick={toggleMenu} aria-label='go to homepage'><img src={logo} className='w-[90px] h-auto max-w-[85px] md:max-w-[95px]' alt="logo" /></Link>
                  </div>

                  {/* searchBar */}
                  <div className='relative text-sm lg:ml-6'>
                    <form action="#" className='' onSubmit={handleSearch}>
                    <Input placeholder="Search" name="search" value={searchText} onChange={handleChange} className="!h-[1.85rem] dark:bg-slate-700 dark:border-slate-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-400"  padding="!px-4 pr-[2.3rem]" ></Input>
                      <BsSearch className='absolute top-2.5 right-4 text-lightBorder dark:text-slate-400'></BsSearch>
                    </form>
                  </div>
                  
                  {/* menu-close-button */}
                  <div className='md:hidden'>
                    <IoClose className='text-4xl mr-[2px] border border-gray-400 rounded px-[0.32rem] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 duration-200' onClick={toggleMenu}/>
                  </div>
              </div>
             
              {/* navLinks */}
              <div className='pb-[0.8rem] mb-[1rem] border-b-2 border-gray-300'>
                  <ul>
                    <li className='leading-7 mt-1'><Link to="/" onClick={toggleMenu} aria-label='home' className="block border-l-2 border-transparent rounded hover:border-primary hover:text-black dark:text-white hover:bg-slate-200 dark:hover:bg-gray-600 duration-300 px-3 py-1">Home</Link></li>
                    <li className='leading-7 mt-1'><Link to="/blogs" onClick={toggleMenu} aria-label='blogs' className="block border-l-2 border-transparent rounded hover:border-primary hover:text-black dark:text-white hover:bg-slate-200 dark:hover:bg-gray-600 duration-300 px-3 py-1">All Blogs</Link></li>
                    <li className='leading-7 mt-1'><Link to="/about_us" onClick={toggleMenu} aria-label='about' className="block border-l-2 border-transparent rounded hover:border-primary hover:text-black dark:text-white hover:bg-slate-200 dark:hover:bg-gray-600 duration-300 px-3 py-1">About</Link></li>
                 </ul>
              </div>
                         
              {/* profile/auth-section */}
              <div className="flex justify-between items-start">
                  <div>
                      {isAuthenticated?
                        <>
                              <div className='flex justify-between items-center'>
                                  {/* user-detail */}
                                  <div className='flex items-center gap-2 rounded-md py-1'>
                                      <img src={userData?.image} alt="profile-image" className='w-[35px] h-[35px] max-w-[40px] max-h-[40px] rounded-full object-cover' />   
                                      <div className='leading-4'>
                                          <p className='text-gray-600 dark:text-gray-200 font-semibold capitalize'>{userData?.firstName+" "+userData?.lastName}</p>
                                          <p className='text-sm text-gray-500 dark:text-gray-300'>{userData?.email}</p>
                                      </div>           
                                  </div>
                                
                              </div>

                              {/* profile navigations */}
                              <div className='mt-2'>
                                <ul> 
                                    <li className='leading-7 mt-1'><Link to="/profile" onClick={toggleMenu} className="block border-l-2 border-transparent rounded hover:border-primary hover:text-black hover:bg-slate-200 dark:text-white dark:hover:bg-slate-600 duration-300 px-3 py-1">Profile</Link></li>
                                    <li className='leading-7 mt-1'><Link to="/add_blog" onClick={toggleMenu} className="block border-l-2 border-transparent rounded hover:border-primary hover:text-black hover:bg-slate-200 dark:text-white dark:hover:bg-slate-600 duraton-300 px-3 py-1">Add Blog</Link></li>
                                    <li className='leading-7 mt-1'><Link to={`/blogs/author/${userData?._id}`} onClick={toggleMenu} className="block border-l-2 border-transparent rounded hover:border-primary hover:text-black hover:bg-slate-200 dark:text-white dark:hover:bg-slate-600 duraton-300 px-3 py-1">My Blogs</Link></li>
                                    <li className='leading-7 mt-1'><Link onClick={()=>{handleSignOut(),toggleMenu()}} className="block border-l-2 border-transparent rounded hover:border-primary hover:text-black hover:bg-slate-200 dark:text-white dark:hover:bg-slate-600 duration-300 px-3 py-1">Logout</Link></li>
                                </ul>
                              </div>
                          </>
                        
                          :
                          // login-button
                            <div>
                              <Button type='button' onClick={()=>{navigate('/sign_in'),toggleMenu()}} aria-label="login" className='text-white bg-lightPrimary hover:bg-primary duration-300 dark:bg-primary dark:hover:bg-lightPrimary'>Sign In</Button>
                            </div>
                        }
                  </div>

                  {/* themeButton */}
                  <div onClick={()=>dispatch(themeToggle())} role='button' aria-label="theme-mode" className='border border-gray-500 rounded-full mr-4 p-[0.4rem] hover:bg-gray-200 dark:hover:bg-gray-700 duration-300 cursor-pointer'>
                                  {themeMode==="light"?<HiOutlineMoon className='text-[1rem] text-gray-800'/>
                                                      :<BiSun className='text-[1rem] text-gray-800 dark:text-white'/>
                                  }
                  </div>
              </div>
          </div>


      </nav>
  )
}
