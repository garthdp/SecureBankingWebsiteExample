import {BrowserRouter, Routes, Route} from 'react-router-dom'
import WelcomePage from './pages/welcomepage'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Navbar from './components/navbar'
import Unauthorized from './pages/Unauthorized'
import ProtectedPages from './context/ProtectedPages'
import EmployeeTransactionPage from './pages/employeeTransactionPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='/home' element={
              <ProtectedPages allowedRoles={['User']}>
                <Home/>
              </ProtectedPages>
            }/>
            <Route path='/employeeTransactionPage' element={
              <ProtectedPages allowedRoles={['Employee']}>
                <EmployeeTransactionPage/>
              </ProtectedPages>
            }/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/unauthorized' element={<Unauthorized/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/' element={<WelcomePage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
