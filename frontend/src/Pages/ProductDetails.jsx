import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { Box, Button, Image, Text, Heading, HStack, Flex, Icon, Spinner, VStack, Badge } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="80vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error || !product) {
    return <Heading textAlign="center" mt={10} color="red.500">{error || "Product not found"}</Heading>;
  }

  return (
    <Box maxW="container.lg" mx="auto" p={5}>
      <Button colorScheme="gray" mb={4} onClick={() => navigate(-1)}>Back</Button>

      <Flex direction={{ base: "column", md: "row" }} gap={8} p={6} boxShadow="lg" borderRadius="lg" bg="white">
        <Box flex="1">
          <Image
            src={`http://localhost:8000/uploads/${product.productImage}`}
            alt={product.productName}
            borderRadius="md"
            objectFit="contain"
            w="100%"
            h={{ base: "300px", md: "450px" }}
            boxShadow="md"
          />
        </Box>

        <VStack flex="1" align="start" spacing={4}>
          <Heading size="lg">{product.productName}</Heading>
          <Badge colorScheme="green" fontSize="md" p={1} borderRadius="md">In Stock</Badge>
          <Text fontSize="md" color="gray.600">{product.productDescription}</Text>
          <Text fontSize="2xl" fontWeight="bold" color="red.500">₹{product.productPrice}</Text>

          <HStack spacing={1}>
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} color={i < (product.productRating || 0) ? "gold" : "lightgray"} />
            ))}
          </HStack>

          <HStack mt={4} spacing={4}>
            <Button leftIcon={<FaShoppingCart />} bg="yellow.400" color="black" borderRadius="md" _hover={{ bg: "yellow.500" }} size="lg" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
            <Button rightIcon={<RiArrowRightLine />} bg="orange.600" color="white" _hover={{ bg: "orange.500" }} borderRadius="md" size="lg">
              Buy Now
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
}