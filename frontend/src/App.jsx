import { Route, Router, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './Component/Navbar';
import ProductCard from './Pages/ProductCard';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Signup from './Pages/Signup';
import Login from './Pages/Login';


function App() {


  return (
    <>  
    
    <Navbar/>
    <Routes>
      <Route path='/' element={<ProductCard/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App
