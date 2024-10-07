import { useEffect, useState } from "react";
import { useTransactionsContext } from "../hooks/useTransactionsContext";
import { useFormik } from "formik";
import { transactionSchema } from "../schemas";

const TransactionForm = () => {
    const { dispatch } = useTransactionsContext();
    const [providerEmail, setProviderEmail] = useState('');
    const [error, setError] = useState(null);

    // Fetch user email from localStorage
    useEffect(() => {
        const user = localStorage.getItem('user');
        const email = JSON.parse(user);
        setProviderEmail(email?.email || "");
    }, []);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            amount: "",
            currency: "",
            recipientName: "",
            swiftCode:"",
            recipientAccountNumber: "",
        },
        validationSchema: transactionSchema,
        onSubmit: async (values, actions) => {
            const transaction = {
                ...values,
                providerEmail
            };

            try {
                console.log(transaction)
                const response = await fetch('api/transaction/', {
                    method: 'POST',
                    body: JSON.stringify(transaction),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                const json = await response.json();

                if (!response.ok) {
                    setError(json.error);
                } else {
                    actions.resetForm();
                    setError(null);
                    console.log("New Transaction Added", json);
                    dispatch({ type: 'CREATE_TRANSACTION', payload: json });
                }
            } catch (error) {
                setError("An error occurred while submitting the form.");
            }
        }
    });

    return (
        <form className="create" onSubmit={formik.handleSubmit}>
            <h3>Add new transaction</h3>

            <label>Transaction Amount:</label>
            <input
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="amount"
                className={formik.errors.amount && formik.touched.amount ? "input-error" : ""}
            />
            {formik.errors.amount && formik.touched.amount && <p className="error">{formik.errors.amount}</p>}

            <label>Currency:</label>
            <input
                type="text"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="currency"
                className={formik.errors.currency && formik.touched.currency ? "input-error" : ""}
            />
            {formik.errors.currency && formik.touched.currency && <p className="error">{formik.errors.currency}</p>}

            <label>Swift Code:</label>
            <input
                type="text"
                value={formik.values.swiftCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="swiftCode"
                className={formik.errors.swiftCode && formik.touched.swiftCode ? "input-error" : ""}
            />
            {formik.errors.swiftCode && formik.touched.swiftCode && <p className="error">{formik.errors.swiftCode}</p>}

            <label>Recipient Name:</label>
            <input
                type="text"
                value={formik.values.recipientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="recipientName"
                className={formik.errors.recipientName && formik.touched.recipientName ? "input-error" : ""}
            />
            {formik.errors.recipientName && formik.touched.recipientName && <p className="error">{formik.errors.recipientName}</p>}

            <label>Recipient Account Number:</label>
            <input
                type="number"
                value={formik.values.recipientAccountNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="recipientAccountNumber"
                className={formik.errors.recipientAccountNumber && formik.touched.recipientAccountNumber ? "input-error" : ""}
            />
            {formik.errors.recipientAccountNumber && formik.touched.recipientAccountNumber && <p className="error">{formik.errors.recipientAccountNumber}</p>}

            <button type="submit" disabled={formik.isSubmitting}>Add transaction</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default TransactionForm;
