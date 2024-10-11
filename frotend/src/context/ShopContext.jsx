import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$'; 
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const backendURl = import.meta.env.VITE_BACKEND_URL;

  // Add to Cart
  const addtoCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    // Update local cart state
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    // Sync with backend if user is logged in
    if (token) {
      try {
        await axios.post(
          `${backendURl}/api/cart/add`,
          { itemId, size }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Added to cart!');
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Error adding to cart');
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          totalCount += cartItems[items][size];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    // Sync quantity update with backend
    if (token) {
      try {
        await axios.post(
          `${backendURl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Cart updated!');
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Error updating cart');
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const size in cartItems[items]) {
          totalAmount += itemInfo.price * cartItems[items][size];
        }
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendURl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error fetching products');
    }
  };

  // Fetch cart data when the page loads
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendURl}/api/cart/get`,
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cart); // Sync cart data from backend
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error fetching cart data');
    }
  };

  // Fetch the cart data when the component loads
  useEffect(() => {
    if (token) {
      getUserCart(token); // Fetch cart data if user is logged in
    }
  }, [token]);

  useEffect(() => {
    getProductData(); // Fetch product data on component mount
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]); // Save cart data to localStorage whenever cartItems change

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setCartItems(savedCartItems); // Load cart data from localStorage
    }
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    setShowSearch,
    showSearch,
    cartItems,
    addtoCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
