import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// keeping track of our context for session managemnent
//we need to know when the user is logged in or out

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [ok, setOk] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async(email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }

        if(response.ok){
            setOk(json.ok)
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error, ok}
}