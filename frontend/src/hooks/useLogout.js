import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = async () => {
        // Make the API call to log out
        const response = await fetch('/api/users/logout', { 
            method: 'GET', 
            credentials: 'include'
        });

        if (response.ok) {
            // Remove user from localStorage if logout was successful
            localStorage.removeItem('user');

            // Dispatch the logout action to update the context
            dispatch({ type: 'LOGOUT' });

            // Redirect to the login page after logging out
            navigate('/login');
        } else {
            // Handle error (optional)
            const errorData = await response.json();
            console.error('Logout failed:', errorData);
        }
    };

    return { logout };
};