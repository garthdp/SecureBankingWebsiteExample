import { useState, useEffect } from "react"
import { useTransactionsContext } from "../hooks/useTransactionsContext"

const TransactionForm = () => {
    const { dispatch } = useTransactionsContext()
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('')
    const [providerEmail, setProviderEmail] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [recipientAccountNumber, setRecipientAccountNumber] = useState('')
    const [error, setError] = useState(null)

    useEffect(()=> {
        const user = localStorage.getItem('user')
        const email = JSON.parse(user)
        setProviderEmail(email.email)
    }, [])
    
    const handleSubmit = async(e) => {

        const transaction = {amount, currency, providerEmail, recipientName, recipientAccountNumber}

        const response = await fetch('api/transaction/', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setAmount('')
            setCurrency('')
            setProviderEmail('')
            setRecipientAccountNumber('')
            setRecipientName('')
            setError(null)
            console.log("New Transaction Added", json)
            dispatch({type: 'CREATE_TRANSACTION', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new transaction</h3>

            <label>Transaction Amount:</label>
            <input 
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}/>
                
            <label>Currency:</label>
            <input 
                type="text"
                onChange={(e) => setCurrency(e.target.value)}
                value={currency}/>
                
            <label>Recipient Name:</label>
            <input 
                type="text"
                onChange={(e) => setRecipientName(e.target.value)}
                value={recipientName}/>
                
            <label>Recipient Account Number:</label>
            <input 
                type="number"
                onChange={(e) => setRecipientAccountNumber(e.target.value)}
                value={recipientAccountNumber}/>

            <button>Add transaction</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TransactionForm