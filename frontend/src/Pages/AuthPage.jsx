// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';

// export default function AuthPage() {
//     const [isLogin, setIsLogin] = useState(true);

//     const pageVariants = {
//         initial: { opacity: 0, x: "-100%" },
//         in: { opacity: 1, x: 0 },
//         out: { opacity: 0, x: "100%" }
//     };

//     const pageTransition = {
//         type: "tween",
//         ease: "anticipate",
//         duration: 0.8
//     };

//     const containerVariants = {
//         hidden: { opacity: 0, scale: 0.9 },
//         visible: {
//             opacity: 1,
//             scale: 1,
//             transition: {
//                 delayChildren: 0.3,
//                 staggerChildren: 0.2
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 type: "spring",
//                 stiffness: 300
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
//             <motion.div
//                 initial="initial"
//                 animate="in"
//                 exit="out"
//                 variants={pageVariants}
//                 transition={pageTransition}
//                 className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex"
//             >
//                 {/* Left Side - Illustration */}
//                 <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.8 }}
//                         className="text-center text-white z-10"
//                     >
//                         <h2 className="text-4xl font-bold mb-4">
//                             {isLogin ? 'Welcome Back!' : 'Hello, Friend!'}
//                         </h2>
//                         <p className="mb-8 text-white/80">
//                             {isLogin
//                                 ? 'Log in to continue your journey'
//                                 : 'Create your account and start exploring'}
//                         </p>
//                         <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => setIsLogin(!isLogin)}
//                             className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full transition-all"
//                         >
//                             {isLogin ? 'Sign Up' : 'Log In'}
//                         </motion.button>
//                     </motion.div>

//                     {/* Background Shapes */}
//                     <div className="absolute top-0 left-0 w-full h-full opacity-20">
//                         <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-16 -left-16"></div>
//                         <div className="absolute w-96 h-96 bg-white/10 rounded-full -bottom-32 -right-32"></div>
//                     </div>
//                 </div>

//                 {/* Right Side - Authentication Form */}
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="w-1/2 p-12 flex flex-col justify-center"
//                 >
//                     <motion.h2
//                         variants={itemVariants}
//                         className="text-3xl font-bold mb-6 text-center text-gray-800"
//                     >
//                         {isLogin ? 'Log In' : 'Create Account'}
//                     </motion.h2>

//                     {/* Social Login */}
//                     <motion.div
//                         variants={itemVariants}
//                         className="flex justify-center space-x-4 mb-6"
//                     >
//                         <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             className="bg-red-500 text-white p-3 rounded-full"
//                         >
//                             <FaGoogle />
//                         </motion.button>
//                         <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             className="bg-blue-600 text-white p-3 rounded-full"
//                         >
//                             <FaFacebook />
//                         </motion.button>
//                     </motion.div>

//                     {/* Divider */}
//                     <motion.div
//                         variants={itemVariants}
//                         className="flex items-center my-4"
//                     >
//                         <div className="flex-grow border-t border-gray-300"></div>
//                         <span className="mx-4 text-gray-500">or</span>
//                         <div className="flex-grow border-t border-gray-300"></div>
//                     </motion.div>

//                     {/* Form */}
//                     <motion.form
//                         variants={containerVariants}
//                         className="space-y-4"
                       
//                     >
//                         {!isLogin && (
//                             <motion.div
//                                 variants={itemVariants}
//                                 className="relative"
//                             >
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                                     <FaUser />
//                                 </div>
//                                 <input
//                                     type="text"
//                                     placeholder="Full Name"
//                                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </motion.div>
//                         )}

//                         {!isLogin && (
//                             <motion.div
//                                 variants={itemVariants}
//                                 className="relative"
//                             >
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                                     <FaPhone />
//                                 </div>
//                                 <input
//                                     type="tel"
//                                     placeholder="Phone Number"
//                                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </motion.div>
//                         )}

//                         <motion.div
//                             variants={itemVariants}
//                             className="relative"
//                         >
//                             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                                 <FaEnvelope />
//                             </div>
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </motion.div>

//                         <motion.div
//                             variants={itemVariants}
//                             className="relative"
//                         >
//                             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                                 <FaLock />
//                             </div>
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </motion.div>



//                         {isLogin && (
//                             <motion.div
//                                 variants={itemVariants}
//                                 className="flex justify-between items-center"
//                             >
//                                 <label className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         className="mr-2"
//                                     />
//                                     Remember me
//                                 </label>
//                                 <a href="#" className="text-blue-500 hover:underline">
//                                     Forgot Password?
//                                 </a>
//                             </motion.div>
//                         )}

//                         <motion.button
//                             variants={itemVariants}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
//                         >
//                             {isLogin ? 'Log In' : 'Sign Up'}
//                         </motion.button>
//                     </motion.form>
//                 </motion.div>
//             </motion.div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {isLogin ? <LoginForm toggleForm={() => setIsLogin(false)} /> : <SignupForm toggleForm={() => setIsLogin(true)} />}
        </div>
    );
}

const LoginForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:8000/auth/login", formData);
            localStorage.setItem('userToken', response.data.token);
            navigate('/mens');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Try again.');
        }
        setLoading(false);
    };

    return (
        <motion.div className="bg-white shadow-lg rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField icon={<FaEnvelope />} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                <InputField icon={<FaLock />} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg transition hover:bg-blue-600" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
            </form>
            <p className="text-center text-sm mt-4">Don't have an account? <button onClick={toggleForm} className="text-blue-500 underline">Sign Up</button></p>
        </motion.div>
    );
};

const SignupForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: ''  });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:8000/auth/signup", formData);
            if(success){
                console.log("Signup successful");   
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Try again.');
        }
        setLoading(false);
    };

    return (
        <motion.div className="bg-white shadow-lg rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField icon={<FaUser />} name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                <InputField icon={<FaEnvelope />} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                <InputField icon={<FaLock />} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                <InputField icon={<FaPhone />} name="phoneNumber" type="tel" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required />
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg transition hover:bg-green-600" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
            </form>
            <p className="text-center text-sm mt-4">Already have an account? <button onClick={toggleForm} className="text-green-500 underline">Log In</button></p>
        </motion.div>
    );
};

const InputField = ({ icon, name, type, placeholder, value, onChange, required }) => (
    <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
);
