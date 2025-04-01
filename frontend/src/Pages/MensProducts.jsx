import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart, FaEye, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

export default function MensProducts() {
    const [products, setProducts] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getProducts = async () => {
        const url = "http://localhost:8000/product";      
        const responseProduct = await axios.get(url);
        setProducts(responseProduct.data.products);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
    }

    const closeModal = () => {
        setSelectedProduct(null);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Product Grid */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
                    Mens Collection
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover our latest collection of stylish and high-quality mens fashion.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <div 
                        key={product.productId} 
                        className="relative group"
                        onMouseEnter={() => setHoveredProduct(product.productId)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <img 
                                    src={`http://localhost:8000/uploads/${product.productImage}`} 
                                    alt={product.productName} 
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                
                                {/* Hover Overlay */}
                                <div 
                                    className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center space-x-4 ${
                                        hoveredProduct === product.productId ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <button className="bg-white p-3 rounded-full shadow-md transform hover:scale-110 transition-all duration-300 hover:bg-blue-50">
                                        <FaHeart className="text-red-500" />
                                    </button>
                                    <button 
                                        onClick={() => handleQuickView(product)}
                                        className="bg-white p-3 rounded-full shadow-md transform hover:scale-110 transition-all duration-300 hover:bg-blue-50"
                                    >
                                        <FaEye className="text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                        {product.productName}
                                    </h3>
                                    <span className="text-xl font-bold text-green-600">
                                        ${product.productPrice}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {product.productDescription}
                                </p>

                                {/* Add to Cart Button */}
                                <button 
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg 
                                    flex items-center justify-center gap-3 
                                    transform transition-all duration-500 
                                    hover:from-blue-700 hover:to-blue-800 
                                    hover:shadow-lg hover:translate-y-[-5px]"
                                >
                                    <FaShoppingCart className="text-lg" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Screen Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex overflow-hidden shadow-2xl"
                        >
                            {/* Left Side - Product Image */}
                            <div className="w-3/5 relative">
                                <img 
                                    src={`http://localhost:8000/uploads/${selectedProduct.productImage}`} 
                                    alt={selectedProduct.productName} 
                                    className="w-full h-full object-cover"
                                />
                                {/* Close Button */}
                                <button 
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                                >
                                    <FaTimes className="text-gray-700 text-2xl" />
                                </button>
                            </div>

                            {/* Right Side - Product Details */}
                            <div className="w-2/5 p-8 flex flex-col justify-center">
                                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                                    {selectedProduct.productName}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    {selectedProduct.productDescription}
                                </p>
                                <div className="flex items-center mb-6">
                                    <span className="text-3xl font-bold text-green-600 mr-4">
                                        ${selectedProduct.productPrice}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all">
                                            Add to Cart
                                        </button>
                                        <button className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-all">
                                            <FaHeart className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="border-t pt-6">
                                    <h3 className="font-semibold mb-2">Product Details</h3>
                                    <ul className="list-disc list-inside text-gray-600">
                                        <li>High-quality material</li>
                                        <li>Comfortable fit</li>
                                        <li>Stylish design</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}