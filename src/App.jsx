import { lazy, Suspense, useEffect,useState} from 'react';
import { BrowserRouter as Router, Route,Routes, useNavigation} from 'react-router-dom';
import {Header, ScrollToTop} from './components';
import { Home } from './pages/Home';
import PrivateRoutes from './utils/PrivateRoutes';
import AuthRoutes from './utils/AuthRoutes';
import { setupInterceptors } from './services/api';
import { store } from './redux/store';
import { NotFound } from './pages/NotFound';
import { Loading } from './components';
import { ForgotPassword, ResetPassword } from './pages';

const AllBlogs=lazy(()=>import('./pages').then((module) => ({ default: module.AllBlogs })));
const AuthorBlogs=lazy(()=>import('./pages').then((module) => ({ default: module.AuthorBlogs })));
const CategoryBlogs=lazy(()=>import('./pages').then((module) => ({ default: module.CategoryBlogs })));
const SearchBlog=lazy(()=>import('./pages').then((module) => ({ default: module.SearchBlog })));
const BlogDetail=lazy(()=>import('./pages').then((module) => ({ default: module.BlogDetail })));
const SignIn=lazy(()=>import('./pages').then((module) => ({ default: module.SignIn })));
const SignUp=lazy(()=>import('./pages').then((module) => ({ default: module.SignUp })));
const AddBlog=lazy(()=>import('./pages').then((module) => ({ default: module.AddBlog })));
const EditBlog=lazy(()=>import('./pages').then((module) => ({ default: module.EditBlog })));
const Profile=lazy(()=>import('./pages').then((module) => ({ default: module.Profile })));
const Footer=lazy(()=>import('./components').then((module) => ({ default: module.Footer })));


function App() {
  const [loading,setLoading]=useState(false);
  
  const loadingShow=(show)=>setLoading(show);

  // calling this method before submit request
    setupInterceptors(store,loadingShow);


  return (
    <>
        <Router>

            <Loading show={loading}></Loading>

            <ScrollToTop history={history}></ScrollToTop>
            {/* header */}
            <Header/>
            <Suspense fallback={<Loading></Loading>}>
                <Routes>  
                    {/* public routes */}
                    <Route path='/' exact element={<Home/>}></Route>   
                    <Route path='/blogs' element={<AllBlogs/>}></Route>
                    <Route path='/blogs/author/:authorId' element={<AuthorBlogs/>}></Route>
                    <Route path='/blogs/:category' element={<CategoryBlogs/>}></Route>
                    <Route path='/blogs/search/:searchTerm' element={<SearchBlog/>}></Route>
                    <Route path='/blog/:slug'  element={<BlogDetail/>}></Route> 
                  
                    <Route element={<AuthRoutes></AuthRoutes>}>
                          {/* auth routes */}
                        <Route path='/sign_up' element={<SignUp/>}></Route>
                        <Route path='/sign_in' element={<SignIn/>}></Route>
                        <Route path='/forgot_password' element={<ForgotPassword/>}></Route>
                        <Route path='/reset_password/:token' element={<ResetPassword/>}></Route>
                    </Route>


                    <Route path="*"  element={<NotFound resMsg="Oops! Page not found" />}></Route>
                    
                    {/* Protected routes */}
                    <Route element={<PrivateRoutes/>}>  
                        <Route path='/add_blog' element={<AddBlog/>}></Route>
                        <Route path='/edit_blog/:slug' element={<EditBlog/>}></Route>
                        <Route path='/profile' element={<Profile/>}></Route>
                    </Route>
                </Routes>

                {/* footer */}
                <Footer/> 
            </Suspense>     
        </Router>

    </>
  )
}

export default App
