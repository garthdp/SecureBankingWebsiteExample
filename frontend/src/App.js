import {BrowserRouter, Routes, Route} from 'react-router-dom'
import WelcomePage from './pages/welcomepage'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Navbar from './components/navbar'
import Employee from './pages/employee'
import Unauthorized from './pages/Unauthorized'
import ProtectedPages from './context/ProtectedPages'
import EmployeeTransactionPage from './pages/employeeTransactionPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {window.location.pathname !== '/' && (
          <Navbar />
        )}
        <div className='pages'>
          <Routes>
            <Route path='/home' element={
              <ProtectedPages allowedRoles={['User']}>
                <Home/>
              </ProtectedPages>
            }/>
          </Routes>
          <Routes>
            <Route path='/employee' element={
              <ProtectedPages allowedRoles={['Employee']}>
                <Employee/>
              </ProtectedPages>
            }/>
          </Routes>
          <Routes>
            <Route path='/login' element={<Login/>}/>
          </Routes>
          <Routes>
            <Route path='/unauthorized' element={<Unauthorized/>}/>
          </Routes>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
          <Routes>
            <Route path='/' element={<WelcomePage/>}/>
          </Routes>
          <Routes>
            <Route path='/employeeTransactionPage' element={<EmployeeTransactionPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
