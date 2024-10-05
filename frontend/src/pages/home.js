import { useEffect, useState } from "react";
import TransactionDetails from '../components/TransactionDetails';
import TransactionForm from '../components/TransactionForm';
import { useTransactionsContext } from "../hooks/useTransactionsContext";

const Home = () => {
    const { transactions, dispatch } = useTransactionsContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const email = user ? JSON.parse(user).email : null;

        if (email) {
            const fetchTransactions = async () => {
                setLoading(true);
                setError(null);
                
                try {
                    const response = await fetch(`api/transaction?providerEmail=${email}`);
                    
                    if (!response.ok) {
                        throw new Error("Failed to fetch transactions");
                    }

                    const json = await response.json();
                    dispatch({ type: 'SET_TRANSACTIONS', payload: json });
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchTransactions();
        } else {
            setLoading(false); // No email found, stop loading
        }
    }, [dispatch]);

    return (
        <div className="Home">
            <TransactionForm />
            <h2>Previous Transactions</h2>
            {loading && <p>Loading transactions...</p>}
            {error && <div className="error">{error}</div>}
            <div className="books">
                {transactions && transactions.map((transaction) => (
                    <TransactionDetails key={transaction._id} transaction={transaction} />
                ))}
            </div>
        </div>
    );
};

export default Home;
