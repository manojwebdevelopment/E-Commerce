import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Button, Text, IconButton, Badge, Spinner, HStack, VStack, Spacer } from "@chakra-ui/react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Authverify from "./Authverify";
import { successMessage } from "./ToastMessage";

let refreshCartCountFunction = null;

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const refreshCartCount = async () => {
        const userData = await Authverify();
        if (!userData) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/cart", {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            const result = await response.json();

            if (response.ok) {
                const totalItems = result.cart.reduce((sum, item) => sum + item.productQuantity, 0);
                setCartCount(totalItems);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshCartCountFunction = refreshCartCount;
        refreshCartCount();
    }, []);

    useEffect(() => {
        const verifyUser = async () => {
            const userData = await Authverify();
            if (userData) {
                setUser(userData.user.name);
                setIsLoggedIn(true);
                refreshCartCount();
            } else {
                setIsLoggedIn(false);
                localStorage.removeItem("token");
            }
        };

        if (localStorage.getItem("token")) {
            verifyUser();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        setCartCount(0);
        successMessage("Logged out successfully");
        navigate("/");
    };

    return (
        <Box bg="gray.100" px={4} py={3} shadow="md">
            <Flex alignItems="center" maxW="container.lg" mx="auto">
                <Text fontSize="xl" fontWeight="bold" color="blue.600" cursor="pointer" onClick={() => navigate("/")}>
                    🛒 MyStore
                </Text>
                <Spacer />
                
                {/* Desktop Menu */}
                <HStack spacing={6} display={{ base: "none", md: "flex" }}>
                    <Button color={"gray.800"} variant="ghost" onClick={() => navigate("/")}>Home</Button>
                    <Button color={"gray.800"} variant="ghost" onClick={() => navigate("/products")}>Products</Button>
                    <Button color={"gray.800"} variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
                </HStack>
                
                <Spacer />

                <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                    <Button leftIcon={<FaShoppingCart />} colorScheme="blue" onClick={() => navigate("/cart")}>
                        Cart
                        <Badge ml={2} colorScheme="red">{isLoading ? <Spinner size="xs" /> : cartCount}</Badge>
                    </Button>
                    {isLoggedIn ? (
                        <Button leftIcon={<FaUserCircle />} onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button colorScheme="green" onClick={() => navigate("/login")}>Login</Button>
                    )}
                </HStack>

                {/* Mobile Menu Toggle Button */}
                <IconButton
                    icon={isMenuOpen ? <FaTimes /> : <FaBars />}
                    display={{ base: "flex", md: "none" }}
                    variant="ghost"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
            </Flex>

            {/* Mobile Menu (Collapsible) */}
            {isMenuOpen && (
                <VStack spacing={4} mt={4} align="start" bg="white" px={4} py={3} shadow="md" borderRadius="md">
                    <Button variant="ghost" onClick={() => { navigate("/"); setIsMenuOpen(false); }}>Home</Button>
                    <Button variant="ghost" onClick={() => { navigate("/products"); setIsMenuOpen(false); }}>Products</Button>
                    <Button variant="ghost" onClick={() => { navigate("/contact"); setIsMenuOpen(false); }}>Contact</Button>
                    {isLoggedIn ? (
                        <Button colorScheme="red" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</Button>
                    ) : (
                        <Button colorScheme="green" onClick={() => { navigate("/login"); setIsMenuOpen(false); }}>Login</Button>
                    )}
                </VStack>
            )}
        </Box>
    );
}

// Export the function to be used by other components
export const refreshNavbarCart = async () => {
    if (refreshCartCountFunction) {
        return await refreshCartCountFunction();
    }
};