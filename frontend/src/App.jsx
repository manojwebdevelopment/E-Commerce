import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import MensProducts from './Pages/MensProducts'
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignupPage'
import ProtectedRoute from './Utils/ProtectedRoute'
import AuthCheck from './Utils/AuthCheck'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/mens' element={<MensProducts />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          {/* <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/> */}
          <Route path='/' element={
            <ProtectedRoute>
              <AuthCheck>
                <Home />
              </AuthCheck>
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
