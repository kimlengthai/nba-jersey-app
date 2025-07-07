import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/authHelpers';

const ProtectedRoute = ({ element, allowedRoles }) => 
{
  const user = getUserFromLocalStorage();

  if (!user || !allowedRoles.includes(user.role)) 
  {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;