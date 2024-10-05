import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const userSchema = yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup.string().min(6).matches(passwordRules, {message: "Please make a stronger password"}).required("Required"),
    idNumber: yup.string().required("Required"),
    accountNumber: yup.string().required("Required")
})