import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"
import { useFormik } from 'formik'
import { userSchema } from "../schemas/index"

const Login = () => {
    const { login, isLoading, error, ok } = useLogin()

    const onSubmit = async (values, actions) => {
        console.log("HELLOO")
        await login(values.email, values.password)
    };    

    const {values, errors, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: userSchema,
        onSubmit,
    })

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Email:</label>
            <input 
                type="email"
                onChange={handleChange}
                value={values.email}
                id="email"
                required
                className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <label>Password:</label>
            <input 
                type="password"
                onChange={handleChange}
                value={values.password}
                id="password"
                required
                className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <button type="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
            <Link to="/signup">
                <button type="button">Sign up</button>
            </Link> 
            {error && <div className="error">{error}</div>}
            {ok && <div className="ok">{ok}</div>}
        </form>
    );
};

export default Login;
