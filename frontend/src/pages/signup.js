import { useState } from "react"
import {useSignup} from "../hooks/useSignup"

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error, ok} = useSignup()

    const handleSubmit = async(e) => {
        e.preventDefault() //do not refresh page on submit
        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}/>
            <label>Password</label>
            <input //if form is loading we need to disable the button
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}/>
            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
            {ok && <div className="ok">{ok}</div>}
        </form>
    )
}
export default Signup