import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';  // Import useNavigate to handle navigation

// Keeping track of our context for session management
export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();  // Initialize useNavigate

    const logout = () => {
        // Remove user from localStorage
        localStorage.removeItem('user');
        
        // Dispatch the logout action to update the context
        dispatch({ type: 'LOGOUT' });
        
        // Redirect to the login page after logging out
        navigate('/login');
    };

    return { logout };
};
