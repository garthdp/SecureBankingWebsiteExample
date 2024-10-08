import {BrowserRouter, Routes, Route} from 'react-router-dom'
import WelcomePage from './pages/welcomepage'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Navbar from './components/navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {window.location.pathname !== '/' && (
          <Navbar />
        )}
        <div className='pages'>
          <Routes>
            <Route path='/home' element={<Home/>}/>
          </Routes>
          <Routes>
            <Route path='/login' element={<Login/>}/>
          </Routes>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
          <Routes>
            <Route path='/' element={<WelcomePage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
