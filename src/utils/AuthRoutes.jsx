import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

 const AuthRoutes = () => {

    let isAuthenticated=useSelector(state=>state.auth.isAuthenticated);

  return (
      isAuthenticated?<Navigate to="/"></Navigate>:<Outlet></Outlet>
  )
}

export default AuthRoutes;