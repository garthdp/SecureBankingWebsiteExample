import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"
import { useFormik } from 'formik'
import { loginSchema } from "../schemas/index"

  

const Login = () => {
    const { login, isLoading, error, ok } = useLogin()

    
    const onSubmit = async (values, actions) => {
        console.log(values);
        console.log(actions);
        //await new Promise((resolve) => setTimeout(resolve, 1000));
        
        await login(values.email, values.password)
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

            <button type="submit" disabled={isLoading}> Login</button>
            <Link to="/signup">
                <button type="button">Sign up</button>
            </Link> 
            {error && <div className="error">{error}</div>}
            {ok && <div className="ok">{ok}</div>}
        </form>
    );
};
   
export default Login;