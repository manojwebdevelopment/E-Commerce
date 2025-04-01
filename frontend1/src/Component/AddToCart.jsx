import { Toaster, toaster } from "@/components/ui/toaster";
import { refreshNavbarCart } from "./Navbar"; // Import directly from Navbar
import Authverify from "./Authverify";

export const addToCart = async (product) => {
   
    const userData = await Authverify();
    if (!userData) {
        toaster.error({title:"User not authenticated. Please log in."});
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toaster.error({title:"User not authenticated. Please log in."});
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          productId: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          productImage: product.productImage,
        }),
      });

      if (response.ok) {
        toaster.success({title:"Product added to cart!"});
        await refreshNavbarCart();
      } else {
        toaster.error({title:"Failed to add product to cart."});
      }
    } catch (error) {
      toaster.error({title:"Failed to add product to cart."});
    }
  };
