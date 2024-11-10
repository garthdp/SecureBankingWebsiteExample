import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

// code attribution
// title = How can i prevent certain type of user role to access other role route using React Router Dom V6 [duplicate]
// link = https://stackoverflow.com/questions/78251380/how-can-i-prevent-certain-type-of-user-role-to-access-other-role-route-using-rea
// author = MOIZ
// author link = https://stackoverflow.com/users/12246300/moiz
// used for user rolls sign in

const ProtectedPages = ({ children, allowedRoles }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.userType)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedPages;
