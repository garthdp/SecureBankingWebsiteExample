import formatDistanceToNow from "date-fns/formatDistanceToNow"

const TransactionDetails = ({transaction}) => {
    console.log(transaction)
    return (
        <div className="transaction-details">
            <h4>{transaction.title}</h4>
            <p><strong>Amount: </strong>{transaction.amount}</p><br></br>
            <p><strong>Currency: </strong>{transaction.currency}</p><br></br>
            <p><strong>Recipient Name: </strong>{transaction.recipientName}</p><br></br>
            <p><strong>Recipient Account Number: </strong>{transaction.recipientAccountNumber}</p><br></br>
            <p>{formatDistanceToNow(new Date(transaction.createdAt), {addSuffix: true})}</p><br></br>
        </div>
    )
}

export default TransactionDetails