import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [ok, setOk] = useState(null);
    const {dispatch} = useAuthContext()

    const login = async(email, password, captchaToken) => {
        setIsLoading(true)
        setError(null)
        setOk(null)

        try{
            console.log(captchaToken)
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, captchaToken})
            })
            const json = await response.json()
    
            if(!response.ok){
                setError(json.error)
                setIsLoading(false)
            }
    
            if(response.ok){
                //1. update the auth context with email
                //2. update isLoading to false
                //3. update our jsonwebtoken. if user closes then opens, they still logged in
                localStorage.setItem('user', JSON.stringify(json))
                // we have to store strings inside localstorage so we convert json object to string
                dispatch({type: 'LOGIN', payload: json})
                setIsLoading(false)
                setOk("Logged in")
            }
        }
        catch(e){
            setError(e.message)
        }
        
    }
    return {login, isLoading, error, ok}
}