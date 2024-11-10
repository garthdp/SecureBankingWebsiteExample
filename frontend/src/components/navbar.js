import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const location = useLocation(); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout();
        navigate("/"); 
    };

    return (
        <header>
            {user && ( 
                <div className="container">
                    {user.userType == "User" && (
                        <Link to="/home"> 
                            <h1>Transactions</h1>
                        </Link>
                    )}
                    {user.userType == "Employee" && (
                        <Link to="/employeeTransactionPage"> 
                            <h1>Transactions</h1>
                        </Link>
                    )}
                    <a onClick={handleLogout}>
                        <h1>Logout</h1>
                    </a>
                </div>
            )}

            {!user && location.pathname === '/signup' && (
                <div className="container">
                    <Link to="/login">
                        <h1>Login</h1>
                    </Link>
                </div>
            )}
            {!user && location.pathname === '/login' && (
                <div className="container">
                    <Link to="/signup">
                        <h1>Sign Up</h1>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
