import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({children}){
   const isAuthenticated = !!localStorage.getItem('authToken');

   if(!isAuthenticated){
     return <Navigate to='/login' replace/>
   }
  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};