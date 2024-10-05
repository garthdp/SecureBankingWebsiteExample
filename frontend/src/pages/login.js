import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh on submit

        // Basic validation
        if (!email || !password) {
            alert("Please fill in all fields."); // Alert the user if fields are empty
            return;
        }

        await login(email, password);
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label htmlFor="email">Email:</label>
            <input 
                type="email"
                id="email" // Added id for better accessibility
                onChange={(e) => setEmail(e.target.value)}
                value={email} 
                required // Ensure the field is required
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password"
                id="password" // Added id for better accessibility
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
                required // Ensure the field is required
            />
            <button disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button> {/* Loading feedback */}
            <br />
            <Link to="/signup">
                <button type="button">Sign up</button>
            </Link>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Login;
