import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartItemsCopy = structuredClone(cartItems);

    const itemToAdd = products.filter((item) => item._id == itemId);
    if (cartItemsCopy[itemToAdd[0]._id]) {
      if (cartItemsCopy[itemToAdd[0]._id][size]) {
        cartItemsCopy[itemToAdd[0]._id][size] += 1;
      } else {
        cartItemsCopy[itemToAdd[0]._id][size] = 1;
      }
    } else {
      cartItemsCopy[itemToAdd[0]._id] = {};
      cartItemsCopy[itemToAdd[0]._id][size] = 1;
    }

    setCartItems(cartItemsCopy);
  };

  const getCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) count += cartItems[item][size];
        } catch (error) {}
      }
    }
    return count;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartItemsCopy = structuredClone(cartItems);
    cartItemsCopy[itemId][size] = quantity;
    setCartItems(cartItemsCopy);
  };

  useEffect(() => {
    setCartCount(getCartCount());
  }, [cartItems]);

  const getCartAmount = () => {
    let amount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === parseInt(item));
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            amount += itemInfo.price * cartItems[item][size];
          }
        } catch (error) {}
      }
    }
    return amount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    cartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
