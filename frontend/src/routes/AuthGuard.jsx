import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({children}){
    const resources = JSON.parse(localStorage.getItem('resources'));
    const isAuthenticated = !!resources && !!resources.authToken;

    if(!isAuthenticated){
        console.log(resources)
        console.log('ssssssss')
        return <Navigate to='/login' replace />
    }
    return children;
}

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired,
};