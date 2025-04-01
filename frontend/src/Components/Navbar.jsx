import React, { useState, useContext } from "react";
import { AuthContext } from "../Components/AuthContext";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // const { isAuthenticated, userName } = useContext(AuthContext);
    
    

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log("Searching for:", searchQuery);
    };

    return (
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wider text-white hover:text-blue-300 transition duration-300">
                    StyleHub
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Navigation Links */}
                    <div className="flex space-x-5">
                        <Link
                            to="/mens"
                            className="hover:text-blue-300 transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Mens
                        </Link>
                        <Link
                            to="/womens"
                            className="hover:text-blue-300 transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Womens
                        </Link>
                        <Link
                            to="/accessories"
                            className="hover:text-blue-300 transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Accessories
                        </Link>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="relative">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 rounded-l-full bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 px-4 py-2 rounded-r-full hover:bg-blue-500 transition duration-300"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </form>

                    {/* Icons and Actions */}
                    <div className="flex items-center space-x-4">
                        
                            <div className="flex items-center space-x-3">
                                <Link to="/account" className="hover:text-blue-300 transition duration-200">
                                    <FaUser className="text-xl" />
                                </Link>
                                <p className="hover:text-blue-300 transition duration-200 ease-in-out transform hover:scale-105">
                                  
                                </p>
                            </div>
                        

                        <Link
                            to="/cart"
                            className="hover:text-blue-300 transition duration-200 relative"
                        >
                            <FaShoppingCart className="text-xl" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                0
                            </span>
                        </Link>
                        <Link
                            to="/login"
                            className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 text-sm"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${isOpen ? "block" : "hidden"
                    } md:hidden bg-gray-800 transition-all duration-300 ease-in-out`}
            >
                <div className="px-4 pt-2 pb-4 space-y-3">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-l-full bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 px-4 py-2 rounded-r-full hover:bg-blue-500"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </form>

                    {/* Mobile Navigation Links */}
                    <div className="space-y-3">
                        <Link
                            to="/mens"
                            className="block hover:bg-gray-700 px-3 py-2 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Mens
                        </Link>
                        <Link
                            to="/womens"
                            className="block hover:bg-gray-700 px-3 py-2 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Womens
                        </Link>
                        <Link
                            to="/accessories"
                            className="block hover:bg-gray-700 px-3 py-2 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Accessories
                        </Link>
                    </div>

                    {/* Mobile Icons and Actions */}
                    <div className="flex justify-between items-center mt-4">
                        <Link
                            to="/cart"
                            className="hover:text-blue-300 relative"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaShoppingCart className="text-xl" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                0
                            </span>
                        </Link>
                        <Link
                            to="/account"
                            className="hover:text-blue-300"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaUser className="text-xl" />
                        </Link>
                        <Link
                            to="/login"
                            className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}