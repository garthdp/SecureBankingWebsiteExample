import { Link  } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Library</h1>
                </Link>
            </div>
            {user && ( //if we have a user then it will show logout button
                <div className="container">
                    <a><h1 onClick={handleClick}>Logout</h1></a>
                </div>
            )}
            {!user && (
                <div className="container">
                    <Link to="/login">
                        <h1>Login</h1>
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar