import { useState } from "react";
import { useSignup } from "../hooks/useSignup"; // Assuming you have a custom hook for signup

const Signup = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [email, setEmail] = useState(''); // Added email state
    const [password, setPassword] = useState('');
    const { signup, isLoading, error, ok } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name, surname, idNumber, accountNumber, email, password);
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />

            <label>Surname:</label>
            <input 
                type="text"
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                required
            />

            <label>ID Number:</label>
            <input 
                type="text"
                onChange={(e) => setIdNumber(e.target.value)}
                value={idNumber}
                required
            />

            <label>Account Number:</label>
            <input 
                type="text"
                onChange={(e) => setAccountNumber(e.target.value)}
                value={accountNumber}
                required
            />

            <label>Email:</label> {/* Added email label */}
            <input 
                type="email" // Use type="email" for better validation
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />

            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
            {ok && <div className="ok">{ok}</div>}
        </form>
    );
};

export default Signup;
