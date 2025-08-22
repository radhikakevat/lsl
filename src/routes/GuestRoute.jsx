import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
 
const GuestRoute = ({ children }) => {
  const {user, loading} = useSelector((state) => state?.auth)
 
  // if (loading) return <p>Loading...</p>;
 
  // If user is already logged in, redirect away from login page
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
 
  return children;
};
 
export default GuestRoute