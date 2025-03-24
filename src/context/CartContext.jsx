import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();




export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from backend on page load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const { data } = await axios.get("http://localhost:5001/api/customer/products/cart", {
          headers: { Authorization: `Bearer ${token}` },
          
        });
  
        console.log("Fetched cart data:", data.cart); // 🛠 Debugging
        setCart(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();
  }, []);
  

  // Update cart in backend
  const updateCartInBackend = async (updatedCart) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found, user might be logged out.");
        return;
      }
  
      console.log("Sending cart data to backend:", updatedCart); // 🛠 Debugging
  
      const response = await axios.post(
        "http://localhost:5001/api/customer/products/cart/add-product",
        { cart: updatedCart },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Cart updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating cart in backend:", error.response?.data || error);
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.quantity < product.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    updateCartInBackend(cart);
  };

  // Increase quantity (Respect stock limits)
  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateCartInBackend(updatedCart); // 🛠 Ensure update is called
      return updatedCart;
    });
  };
  

  // Decrease quantity (Remove if 0)
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
  
      updateCartInBackend(updatedCart); // 🛠 Ensure update is called
      return updatedCart;
    });
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
