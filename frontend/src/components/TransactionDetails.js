import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TransactionDetails = ({ transaction, isEmployee }) => {
    const [status, setStatus] = useState(transaction.status);

    const handleVerify = async () => {
        try {
            const response = await fetch(`/api/transaction/verify/${transaction._id}`, {
                method: "PUT"
            });
            const data = await response.json();

            if (response.ok) {
                setStatus("Verified");
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Verification failed:", error);
        }
    };

    return (
        <div className="transaction-details">
            <h4>{transaction.title}</h4>
            <p><strong>Amount: </strong>{transaction.amount}</p><br />
            <p><strong>Currency: </strong>{transaction.currency}</p><br />
            <p><strong>Recipient Name: </strong>{transaction.recipientName}</p><br />
            <p><strong>Swift Code: </strong>{transaction.swiftCode}</p><br />
            <p><strong>Recipient Account Number: </strong>{transaction.recipientAccountNumber}</p><br />
            <p><strong>Status: </strong>{status}</p><br />
            <p>{formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}</p><br />
            
            {isEmployee && status === "Pending" && (
                <button onClick={handleVerify}>Verify</button>
            )}
        </div>
    );
};

export default TransactionDetails;
