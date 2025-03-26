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

        const { data } = await axios.get(
          "https://op-backend-lgam.onrender.com/api/customer/products/cart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched cart data:", data.cartItems); // Debugging
        setCart(data.cartItems || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  // In CartContext
  const updateCartInBackend = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found, user might be logged out.");
        return;
      }
    
      console.log("Updating cart for product:", productId, "with quantity:", quantity);
    
      const response = await axios.post(
        "https://op-backend-lgam.onrender.com/api/customer/products/cart/add-product",
        { productId, quantity },
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
  

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.id === product.id && item.quantity < product.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      // Update backend for the specific product
      const updatedItem = newCart.find((item) => item.id === product.id);
      updateCartInBackend(product.id, updatedItem.quantity);
      return newCart;
    });
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
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      updateCartInBackend(updatedCart); // 🛠 Ensure update is called
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
