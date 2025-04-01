import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { successMessage, errorMessage } from '../Components/ToastMessage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../Utils/Api';

// Validation Schema
const signUpSchema = yup.object().shape({
    name: yup
        .string()
        .required('Full Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),
    phoneNumber: yup
        .string()
        .required('Phone Number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const SignUpPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Form hook with validation
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm({
        resolver: yupResolver(signUpSchema),
        mode: 'all'
    });

    // Calculate password strength
    const calculatePasswordStrength = (password) => {
        let strength = 0;
        strength += password.length >= 8 ? 1 : 0;
        strength += /[A-Z]/.test(password) ? 1 : 0;
        strength += /[a-z]/.test(password) ? 1 : 0;
        strength += /[0-9]/.test(password) ? 1 : 0;
        strength += /[^A-Za-z0-9]/.test(password) ? 1 : 0;
        return strength;
    };

    // Watch password for strength calculation
    const passwordValue = watch('password', '');

    // Update password strength when password changes
    React.useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(passwordValue || ''));
    }, [passwordValue]);

    // Form submission handler
    const onSubmit = async (data) => {
        try {
            const response = await registerUser({
                name: data.name,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password
            });
    
            // console.log("Backend Response:", response);
            if (response?.success) {
                successMessage(response.message || "Sign Up Successful");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                errorMessage(response?.message || "Sign Up Failed");
            }
    
        } catch (error) {
            // console.error("Signup Error:", error.response?.data); 
            const backendMessage = error.response?.data?.message || "Sign Up Failed!";
            errorMessage(backendMessage);
        }
    };

    const passwordStrengthColors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-green-700'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4 py-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6 border border-gray-100"
            >
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                >
                    Create Account
                </motion.h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Input */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                id="name"
                                {...register('name')}
                                className={`mt-1 block w-full pl-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                  ${errors.name
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                placeholder="John Doe"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                className={`mt-1 block w-full pl-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                  ${errors.email
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                placeholder="you@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </motion.div>

                    {/* Phone Number Input */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative"
                    >
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="tel"
                                id="phoneNumber"
                                {...register('phoneNumber')}
                                className={`mt-1 block w-full pl-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                  ${errors.phoneNumber
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                placeholder="1234567890"
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                        )}
                    </motion.div>

                    {/* Password Input */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="relative"
                    >
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword.password ? "text" : "password"}
                                id="password"
                                {...register('password')}
                                className={`mt-1 block w-full pl-10 pr-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                  ${errors.password
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                placeholder="Create a strong password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.password ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {/* Password Strength Indicator */}
                        <div className="mt-1 flex space-x-1">
                            {[0, 1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className={`h-1 w-full rounded-full ${index < passwordStrength
                                        ? passwordStrengthColors[passwordStrength - 1]
                                        : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </motion.div>

                    {/* Confirm Password Input */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="relative"
                    >
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                {...register('confirmPassword')}
                                className={`mt-1 block w-full pl-10 pr-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                  ${errors.confirmPassword
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pt-2"
                    >
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting" : "Sign Up"}
                        </button>
                    </motion.div>
                </form>

                {/* Login Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <p className="text-sm text-gray-600">
                        Already have an account? {' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                            Log In
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default SignUpPage;