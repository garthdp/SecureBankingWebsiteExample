import { useLogin } from "../hooks/useLogin"
import { useFormik } from 'formik'
import { loginSchema } from "../schemas/index"
import ReCAPTCHA from 'react-google-recaptcha';
import { useState, useRef } from 'react';

const Login = () => {
    const { login, isLoading, error, ok } = useLogin()
    var [captchaToken, setCaptchaToken] = useState(null)
    const recaptchaRef = useRef(null)

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };
    
    const onSubmit = async (values, actions) => {
        console.log(values)
        console.log(actions)
        
        await login(values.email, values.password,captchaToken)
        setCaptchaToken(null)
        recaptchaRef.current.reset()
    };  

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit,
    });

   //console.log(errors);

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
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
            

            <label>Password:</label>
            <input 
                type="password"
                onChange={handleChange}
                value={values.password}
                id="password"
                required
                onBlur={handleBlur}
                className={errors.password && touched.password  ? "input-error" : ""}
            />
            {errors.password && touched.password && <p className="error">{errors.password}</p>}

            <ReCAPTCHA
                sitekey="6LdPjHoqAAAAABfnhV_t1d0sGJZ2Rf7l4cPYM1Mt"  
                onChange={handleCaptchaChange}
                ref={recaptchaRef}
            />

            <button type="submit" disabled={isLoading}> Login</button>
            {error && <div className="error">{error}</div>}
            {ok && <div className="ok">{ok}</div>}
        </form>
    );
};
   
export default Login;