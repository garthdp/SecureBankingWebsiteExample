import { TransactionsContext } from "../context/TransactionsContext"
import { useContext } from "react"

export const useTransactionsContext = () => {
    const context = useContext(TransactionsContext)

    if(!context){
        throw Error('useTransactionsContext must be inside a transactionsContextProvider')
    }

    return context
}