
// import React, { useEffect, useState } from "react";
// import { FaShoppingCart, FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Authverify from "../Component/Authverify";
// import { ToastContainer } from "react-toastify";
// import { successMessage, errorMessage } from "../Component/ToastMessage";
// import { refreshNavbarCart } from "../Component/Navbar"; // Import directly from Navbar
// import { Button, HStack } from "@chakra-ui/react"
// import { RiArrowRightLine, RiMailLine } from "react-icons/ri"

// export default function ProductCard() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const verifyUser = async () => {
//       const userData = await Authverify();
//       if (!userData) {
//         navigate("/");
//       }
//     };

//     verifyUser();
//   }, [navigate]);

//   const getProducts = async () => {
//     try {
//       const url = "http://localhost:8000/product";
//       const responce = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "Application/json"
//         }

//       });
//       const jsonData = await responce.json();
//       const { success, message, error } = jsonData;
//       if (!success) {
//         errorMessage(message);
//       } else if (error) {
//         errorMessage(message);
//       } else {
//         setProducts(jsonData.products);
//       }

//     } catch (error) {
//       errorMessage("No Product Found");
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const addToCart = async (product) => {
//     const userData = await Authverify();
//     if (!userData) {
//       navigate("/login");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       errorMessage("User not authenticated. Please log in.");
//       navigate("/login");
//       return;
//     }

//     setLoading(true); // Show loading state

//     try {
//       const response = await fetch("http://localhost:8000/cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           productId: product.productId,
//           productName: product.productName,
//           productPrice: product.productPrice,
//           productImage: product.productImage,
//         }),
//       });

//       if (response.ok) {
//         successMessage("Product added to cart!");

//         // Call the imported refresh function directly
//         await refreshNavbarCart();

//         setLoading(false);
//       } else {
//         errorMessage("Failed to add product to cart.");
//         setLoading(false);
//       }

//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       errorMessage("Failed to add product to cart.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">

//       {loading && (
//         <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//           style={{ backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 1050 }}>
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       )}
//       <h2 className="text-center my-4">Our Products</h2>
//       <div className="row">

//         {products.map((product) => (
//           <div key={product.productId} className="col-md-4 col-sm-6 col-lg-3 mb-4">
//             <div className="card shadow-sm border-0">
//               <img
//                 src={`http://localhost:8000/uploads/${product.productImage}`}
//                 className="card-img-top p-3"
//                 alt={product.productName || "No title"}
//                 style={{ height: "250px", objectFit: "contain" }}
//               />
//               <div className="card-body text-center">
//                 <h6 className="card-title"
//                   onClick={() => navigate(`/product/${product.productId}`)}
//                   style={{ cursor: "pointer" }}>{product.productName || "Untitled Product"}
//                 </h6>
//                 <p className="text-muted">
//                   {product.productDescription.substring(0, 50) || "No description"}...
//                 </p>
//                 <h5 className="text-danger">₹{product.productPrice || "N/A"}</h5>

//                 <div className="mb-2">
//                   {Array.from({ length: 5 }, (_, i) => (
//                     <FaStar key={i} color={i < (product.productRating || 0) ? "gold" : "lightgray"} />
//                   ))}
//                 </div>

//                 <div className="d-flex justify-content-center gap-2">
//                   <button className="btn btn-outline-primary btn-sm" onClick={() => addToCart(product)}>
//                     <FaShoppingCart /> Add to Cart
//                   </button>
//                   <button className="btn btn-success btn-sm">Buy Now</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Image, Text, Heading, VStack, HStack, Spinner, Flex, Badge } from "@chakra-ui/react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Authverify from "../Component/Authverify";
import { refreshNavbarCart } from "../Component/Navbar";
import { RiArrowRightLine } from "react-icons/ri";
import { Toaster, toaster } from "@/components/ui/toaster";
import { transform } from "framer-motion";
import { addToCart } from "../Component/AddToCart"; // Correct import for named export


export default function ProductCard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const userData = await Authverify();
      if (!userData) {
        navigate("/");
      }
    };
    verifyUser();
  }, [navigate]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/product", { method: "GET", headers: { "Content-Type": "Application/json" } });
      const jsonData = await response.json();
      if (!jsonData.success) {
        toaster.error(jsonData.message);
      } else {
        setProducts(jsonData.products);
      }
    } catch (error) {
      toaster.error({title:"No Products Found"});
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  

  return (
    <Box maxW="container.xl" mx="auto" p={5}>
    {loading && (
      <Flex position="fixed" top={0} left={0} w="100vw" h="100vh" align="center" justify="center" bg="rgba(255,255,255,0.7)" zIndex={1050}>
        <Spinner size="xl" color="blue.500" />
      </Flex>
    )}
    <Heading textAlign="center" mb={6}>Our Products</Heading>
    <Flex wrap="wrap" justify="center" gap={4}>
      {products.map((product) => (
        <Box key={product.productId} p={1} boxShadow="lg" borderRadius="lg" borderWidth="1px" maxW="300px" bg="white" overflow="hidden" _hover={{transform: "scale(1.03)"}} transition="all 0.3s ease-in-out">
          <Image src={`http://localhost:8000/uploads/${product.productImage}`} alt={product.productName} h="250px" objectFit="contain" borderRadius="md" mb={0} />
          <Box p={1}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800" noOfLines={1} cursor="pointer" onClick={() => navigate(`/product/${product.productId}`)}>
              {product.productName}
            </Text>
            <Text fontSize="sm" color="gray.500" noOfLines={2}>{product.productDescription.substring(0, 80)}...</Text>
            <Text fontSize="xl" fontWeight="bold" color="red.500">₹{product.productPrice}</Text>
            <HStack justify="start" my={2}>
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} color={i < (product.productRating || 0) ? "gold" : "lightgray"} />
              ))}
            </HStack>
            <HStack mt={3} spacing={2} justify="space-between">
              <Button leftIcon={<FaShoppingCart />} bg="yellow.400" color="black.400" borderRadius="md" _hover={{ bg: "yellow.500" }} size="sm" onClick={() => addToCart(product)}>Add to Cart</Button>
              <Button rightIcon={<RiArrowRightLine />}  bg="orange.600" _hover={{bg:"orange.500"}} borderRadius="md" size="sm">Buy Now</Button>
            </HStack>
          </Box>
        </Box>
      ))}
    </Flex>
    <Toaster />
  </Box>
  );
}