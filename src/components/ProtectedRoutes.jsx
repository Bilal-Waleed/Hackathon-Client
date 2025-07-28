import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loader';

const ProtectedRoutes = () => {
  const { User, isLoading} = useContext(AuthContext);
  
  if (isLoading) return <Loader />; 
  return User ? <Outlet /> : <Navigate to="/login" />
}

const RestrictedRoutes = () => {
  const { User, isLoading} = useContext(AuthContext);
  
  if (isLoading) return <Loader />; 
  return User ? <Navigate to="/" /> : <Outlet />
}


export { ProtectedRoutes, RestrictedRoutes };