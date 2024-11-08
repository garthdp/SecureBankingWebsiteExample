import { useEffect, useState } from "react";
import TransactionDetails from '../components/TransactionDetails';

const EmployeeTransactionPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`/api/transaction`); // Fetch all transactions for the employee
                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || "Failed to load transactions.");
                } else {
                    setTransactions(data);
                }
            } catch (error) {
                setError("An error occurred while fetching transactions.");
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="employeeTransactionPage">
            <h3>All Client Transactions</h3>

           
            {loading && <div>Loading transactions...</div>}

            
            {error && <div className="error">{error}</div>}

          
            <div className="transactions">
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <TransactionDetails key={transaction._id} transaction={transaction} />
                    ))
                ) : (
                    !loading && <div>No transactions available</div>
                )}
            </div>
        </div>
    );
};

export default EmployeeTransactionPage;
