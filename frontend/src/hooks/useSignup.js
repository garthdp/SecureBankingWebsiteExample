import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// Keeping track of our context for session management
export const useSignup = () => {
    const [error, setError] = useState(null);
    const [ok, setOk] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (name, surname, idNumber, accountNumber, email, password) => {
        setIsLoading(true);
        setError(null);
        setOk(null); // Reset ok state before signup

        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, idNumber, accountNumber, email, password }), // Include additional fields
            });

            const json = await response.json();

            if (!response.ok) {
                // Handle error response
                setError(json.error);
                setIsLoading(false);
            } else {
                // Handle success response
                setOk(json.ok); // Assuming your API sends back an `ok` field on success
                dispatch({ type: 'LOGIN', payload: json }); // Dispatch user data if needed
                setIsLoading(false);
            }
        } catch (err) {
            // Handle network or other errors
            setError('Signup failed. Please try again later.');
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error, ok };
};
