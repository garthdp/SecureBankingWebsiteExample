import * as yup from 'yup';

// Currency regex example for common codes like USD, EUR, GBP
//const currencyRegex = /^[A-Z]{3}$/; 
const swiftValidationRegex = /^[A-Z]$/
const blacklist = /^[a-zA-Z0-9 ]*$/

export const transactionSchema = yup.object().shape({
    amount: yup.number().positive().integer().required("Amount is required and must be a positive integer"),
    currency: yup.string().matches(blacklist, {message: "No special characters are allowed"}).required("Currency is required"),
    swiftCode: yup.string().matches(blacklist, {message: "No special characters are allowed"}).required("Please enter swift code").min(8).max(11),
    recipientName: yup.string().matches(blacklist, {message: "No special characters are allowed"}).required("Please enter a valid name"),
    recipientAccountNumber: yup.number().positive().integer().required("Account number is required and must be a positive integer"),
});

// Password rules
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/; // At least 1 digit, 1 lowercase, 1 uppercase, and minimum 5 characters

export const userSchema = yup.object().shape({
    name: yup.string().matches(blacklist, {message: "No special characters are allowed"}).required("Name is required"),
    surname: yup.string().matches(blacklist, {message: "No special characters are allowed"}).required("Surname is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().min(6).matches(passwordRules, { message: "Please make a stronger password" }).required("Password is required"),
    idNumber: yup.string().matches(blacklist, {message: "No special characters are allowed"}).required("ID number is required"),
    accountNumber: yup.string().matches(blacklist, {message: "No special characters are allowed"}).required("Account number is required")
});

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required")
})