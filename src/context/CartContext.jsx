import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  // Load cart from backend on page load (if token exists)
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

        console.log("Fetched cart data:", data.cartItems);
        setCart(data.cartItems || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Persisted cart to localStorage:", cart);
  }, [cart]);

  const updateCartInBackend = async (productId, quantity, sellerId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found, user might be logged out.");
        return;
      }

      console.log(
        "Updating cart for product:",
        productId,
        "with quantity:",
        quantity,
        "and sellerId:",
        sellerId
      );

      await axios.post(
        "https://op-backend-lgam.onrender.com/api/customer/products/cart/add-product",
        { productId, quantity, sellerId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Cart updated successfully");
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
      updateCartInBackend(product.id, updatedItem.quantity, product.sellerId);
      return newCart;
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const updatedItem = updatedCart.find((item) => item.id === productId);
      if (updatedItem) {
        updateCartInBackend(productId, updatedItem.quantity, updatedItem.sellerId);
      }
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      const updatedItem = updatedCart.find((item) => item.id === productId);
      if (updatedItem) {
        updateCartInBackend(productId, updatedItem.quantity, updatedItem.sellerId);
      } else {
        updateCartInBackend(productId, 0, prevCart.find(item => item.id === productId)?.sellerId);
      }
      return updatedCart;
    });
  };

  // Clear the entire cart once purchase is successful
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    // Optionally, update the backend to clear the cart.
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
