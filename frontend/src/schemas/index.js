import * as yup from 'yup';

// Currency regex example for common codes like USD, EUR, GBP
const currencyRegex = /^[A-Z]{3}$/; 

export const transactionSchema = yup.object().shape({
    amount: yup.number().positive().integer().required("Amount is required and must be a positive integer"),
    currency: yup.string().required("Currency is required"),
    recipientName: yup.string().required("Please enter a valid name"),
    recipientAccountNumber: yup.number().positive().integer().required("Account number is required and must be a positive integer"),
});

// Password rules
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/; // At least 1 digit, 1 lowercase, 1 uppercase, and minimum 5 characters

export const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().min(6).matches(passwordRules, { message: "Please make a stronger password" }).required("Password is required"),
    idNumber: yup.string().required("ID number is required"),
    accountNumber: yup.string().required("Account number is required")
});

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required")
})