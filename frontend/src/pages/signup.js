import { useSignup } from "../hooks/useSignup"
import { useFormik } from 'formik'
import { userSchema } from "../schemas/index"


const Signup = () => {
    const { signup, isLoading, error, ok } = useSignup()
    
    const onSubmit = async (values, actions) => {
        await signup(values.name, values.surname, values.idNumber.toString(), values.accountNumber.toString(), values.email, values.password)
    };

    // formik and yup validation
    // code attribution
    // link = https://www.youtube.com/watch?v=7Ophfq0lEAY
    // author = nikita dev
    // used to do formik and yup
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            idNumber: '',
            accountNumber: '',
        },
        validationSchema: userSchema,
        onSubmit,
    })

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Name:</label>
            <input 
                type="text"
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
                id="name"
                required
                className={errors.name && touched.name ? "input-error" : ""}
            />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
            <label>Surname:</label>
            <input 
                type="text"
                onChange={handleChange}
                value={values.surname}
                onBlur={handleBlur}
                id="surname"
                required
                className={errors.surname && touched.surname ? "input-error" : ""}
            />
            {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}

            <label>ID Number:</label>
            <input 
                type="number"
                onChange={handleChange}
                value={values.idNumber}
                onBlur={handleBlur}
                id="idNumber"
                required
                className={errors.idNumber && touched.idNumber ? "input-error" : ""}
            />
            {errors.idNumber && touched.idNumber && <p className="error">{errors.idNumber}</p>}

            <label>Account Number:</label>
            <input 
                type="number"
                onChange={handleChange}
                value={values.accountNumber}
                onBlur={handleBlur}
                id="accountNumber"
                required
                className={errors.accountNumber && touched.accountNumber ? "input-error" : ""}
            />
            {errors.accountNumber && touched.accountNumber && <p className="error">{errors.accountNumber}</p>}

            <label>Email:</label> {/* Added email label */}
            <input 
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                id="email"
                required
                className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}

            <label>Password:</label>
            <input 
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                id="password"
                required
                className={errors.password && touched.password ? "input-error" : ""}
            />
            {errors.password && touched.password && <p className="error">{errors.password}</p>}

            <button type="submit" disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
            {ok && <div className="ok">{ok}</div>}
        </form>
    )
}

export default Signup
