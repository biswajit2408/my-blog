import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = ({ children }) => {
    const authToken = useSelector((state) => state.auth.authToken);

    // Redirect to login if not authenticated
    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthGuard;
