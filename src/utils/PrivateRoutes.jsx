import { useSelector } from "react-redux";
import {Navigate,Outlet} from "react-router-dom"

const PrivateRoutes=()=>{

    let isAuthenticated=useSelector(state=>state.auth.isAuthenticated)
    
    return (
        isAuthenticated?<Outlet></Outlet>:<Navigate to="/sign_in"></Navigate>
    ) 
}

export default PrivateRoutes;