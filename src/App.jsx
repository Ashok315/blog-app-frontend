import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import {Footer, Header, ScrollToTop} from './components';
import { Home } from './pages/Home';
import PrivateRoutes from './utils/PrivateRoutes';
import AuthRoutes from './utils/AuthRoutes';
import { setupInterceptors } from './services/api';
import { store } from './redux/store';
import { CategoryBlogs } from './pages';
import { NotFound } from './pages/NotFound';

const AllBlogs=lazy(()=>import('./pages').then((module) => ({ default: module.AllBlogs })));
const AuthorBlogs=lazy(()=>import('./pages').then((module) => ({ default: module.AuthorBlogs })));
const SearchBlog=lazy(()=>import('./pages').then((module) => ({ default: module.SearchBlog })));
const BlogDetail=lazy(()=>import('./pages').then((module) => ({ default: module.BlogDetail })));
const SignIn=lazy(()=>import('./pages').then((module) => ({ default: module.SignIn })));
const SignUp=lazy(()=>import('./pages').then((module) => ({ default: module.SignUp })));
const AddBlog=lazy(()=>import('./pages').then((module) => ({ default: module.AddBlog })));
const EditBlog=lazy(()=>import('./pages').then((module) => ({ default: module.EditBlog })));
const Profile=lazy(()=>import('./pages').then((module) => ({ default: module.Profile })));


function App() {

  // calling this method before submit request
    setupInterceptors(store)

  return (
    <>
        <Router>
            <ScrollToTop history={history}></ScrollToTop>
            <Header/>

            <Suspense fallback={<p className='text-center mt-[5rem]'>loading</p>}>
                <Routes>  
                    {/* public routes */}
                    <Route path='/' exact element={<Home/>}></Route>   
                    <Route path='/blogs' element={<AllBlogs/>}></Route>
                    <Route path='/blogs/author/:authorId' element={<AuthorBlogs/>}></Route>
                    <Route path='/blogs/:category' element={<CategoryBlogs/>}></Route>
                    <Route path='/blogs/search/:searchTerm' element={<SearchBlog/>}></Route>
                    <Route path='/blog/:slug'  element={<BlogDetail/>}></Route> 
                    <Route element={<AuthRoutes></AuthRoutes>}>
                        <Route path='/sign_up' element={<SignUp/>}></Route>
                        <Route path='/sign_in' element={<SignIn/>}></Route>
                    </Route>
                    <Route path="*"  element={<NotFound resMsg="Oops! Page not found" />}></Route>
                    
                    {/* Protected routes */}
                    <Route element={<PrivateRoutes/>}>
                        <Route path='/logout'></Route>     
                        <Route path='/add_blog' element={<AddBlog/>}></Route>
                        <Route path='/edit_blog/:slug' element={<EditBlog/>}></Route>
                        <Route path='/profile' element={<Profile/>}></Route>
                    </Route>

                </Routes>
            </Suspense>

            <Footer/>  
        </Router>

    </>
  )
}

export default App
