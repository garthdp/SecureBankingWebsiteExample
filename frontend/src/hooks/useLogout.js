import { useAuthContext } from '../hooks/useAuthContext'

// keeping track of our context for session managemnent
//we need to know when the user is logged in or out

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}