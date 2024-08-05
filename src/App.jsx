import { BrowserRouter as Router, Route,Routes, useNavigate, useNavigation, useLocation} from 'react-router-dom'
import {Footer, Header, ScrollToTop} from './components'
import { Home } from './pages/Home'
import { Test } from './pages/Test'
import { AddBlog, AllBlogs, BlogDetail, EditBlog, Profile, SearchBlog, SignIn, SignUp } from './pages'
import { PageNotFound } from './pages/PageNotFound'
import PrivateRoutes from './utils/PrivateRoutes'
import AuthRoutes from './utils/AuthRoutes'
import { setupInterceptors } from './services/api'
import { store } from './redux/store'


function App() {
    setupInterceptors(store)
  return (
    <>
        <Router>
          <ScrollToTop history={history}></ScrollToTop>
          <Header/>

          <Routes>
            <Route path='/' exact element={<Home/>}></Route>
            <Route path="*"  element={<PageNotFound/>}></Route>
            <Route path='/blogs' element={<AllBlogs/>}></Route>
            <Route path='/blogs/search/:searchTerm' element={<SearchBlog/>}></Route>
            <Route path='/blog/:slug'  element={<BlogDetail/>}></Route>
            
            <Route element={<AuthRoutes></AuthRoutes>}>
                <Route path='/sign_up' element={<SignUp/>}></Route>
                <Route path='/sign_in' element={<SignIn/>}></Route>
            </Route>
           

            <Route element={<PrivateRoutes/>}>
                <Route path='/logout'></Route>     
                <Route path='/add_blog' element={<AddBlog/>}></Route>
                <Route path='/edit_blog/:slug' element={<EditBlog/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
            </Route>
            <Route path='/test'  element={<Test/>}></Route>
            
          </Routes>
          <Footer/>
          
        </Router>

    </>
  )
}

export default App
