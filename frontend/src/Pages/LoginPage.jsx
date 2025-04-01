import React, { useContext,useState } from 'react';
import { AuthContext } from '../Components/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Link , useNavigate} from 'react-router-dom';
import { loginUser } from '../Utils/Api';
import { errorMessage, successMessage } from '../Components/ToastMessage';
import { ToastContainer } from 'react-toastify';


const LoginPage = () => {
    const Navigate = useNavigate();
    const { setIsAuthenticated, setUserName } = useContext(AuthContext); // Using the context

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await loginUser({email, password});
        if(response.success && response.token){
            localStorage.setItem("token", response.token);
            successMessage(response.message);
            setIsAuthenticated(true);
            setUserName(response.name);
            setInterval(() => {
                Navigate("/");
            }, 1000);
        }
        else{
            errorMessage(response.message);
        }
    }
    catch(error){
        errorMessage(error.response?.data?.message || "Something went wrong");
    }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-3xl font-bold text-gray-800"
        >
          Welcome Back
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input 
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            Don't have an account? {' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
      <ToastContainer/>
    </div>
  );
};

export default LoginPage;