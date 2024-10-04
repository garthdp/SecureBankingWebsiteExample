import { useEffect } from "react"
import TransactionDetails from '../components/TransactionDetails'
import TransactionForm from '../components/TransactionForm'
import { useTransactionsContext } from "../hooks/useTransactionsContext"

const Home = () => {
    const {transactions, dispatch} = useTransactionsContext()
    useEffect(() => {
        const user = localStorage.getItem('user')
        const email = JSON.parse(user)
        const fetchTransactions = async () => {
            const response = await fetch('api/transaction?providerEmail=' + email.email)
            const json = await response.json()

            if (response.ok){
                console.log(json)
                dispatch({type: 'SET_TRANSACTIONS', payload: json})
            }
        }
        fetchTransactions()
    }, [dispatch])



    return (
        <div className="Home">
            <div className="books">
                {transactions && transactions.map((transaction) => (
                    <TransactionDetails key={transaction._id} transaction={transaction}/>
                ))}
            </div>
            <TransactionForm />
        </div>
    )
}

export default Home