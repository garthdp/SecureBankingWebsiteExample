import { useEffect, useState } from "react";
import TransactionDetails from '../components/TransactionDetails';
import TransactionForm from '../components/TransactionForm';
import { useTransactionsContext } from "../hooks/useTransactionsContext";

const Home = () => {
    const { transactions, dispatch } = useTransactionsContext();
    const [email, setEmail] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('user');
        const storedEmail = user ? JSON.parse(user).email : null;

        if (storedEmail) {
            setEmail(storedEmail); // Set the email state if it exists
            
            const fetchTransactions = async () => {
                try {
                    const response = await fetch(`api/transaction?providerEmail=${storedEmail}`);
                    
                    if (!response.ok) {
                        throw new Error("Failed to fetch transactions");
                    }

                    const json = await response.json();
                    dispatch({ type: 'SET_TRANSACTIONS', payload: json });
                } catch (err) {
                    console.log(err);
                }
            };
            fetchTransactions();
        }
    }, [dispatch]);

    if(email){
        return (
            <div className="Home">
                <TransactionForm />
                <h2>Previous Transactions</h2>
                <div className="books">
                    {transactions && transactions.map((transaction) => (
                        <TransactionDetails key={transaction._id} transaction={transaction} />
                    ))}
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="Home">
                <h1>Please sign in first</h1>
            </div>
        )
    }
};

export default Home;
