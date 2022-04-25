import React, { useContext, useState, useEffect, useRef } from "react";
import { rates } from "./rates";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsCategories, setProductsCategories] = useState([]);
  const [productsOrder, setProductsOrder] = useState("descending");
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isShoppingCartVisible, setIsShoppingCartVisible] = useState(false);
  const [shoppingCartProducts, setShoppingCartProducts] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [categoryValue, setCategoryValue] = useState("All");
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [totalItemsQuantity, setTotalItemsQuantity] = useState(0);

  const currencyValueRef = useRef();
  const categoryValueRef = useRef();

  const handleProductsOrder = (array) => {
    let sortedArray;

    if (productsOrder === "descending") {
      sortedArray = array.sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price);
      });
    } else {
      sortedArray = array.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
      });
    }

    //SLICED THE ARRAY TO MUTATE THE ARRAY BECAUSE REACT DOESN'T FIRE THE RERENDER IN THIS SITUATION OTHERWISE

    let slicedArray = sortedArray.slice();

    return slicedArray;
  };

  useEffect(() => {
    setProducts(handleProductsOrder(products));
    setFilteredProducts(handleProductsOrder(filteredProducts));
  }, [productsOrder]);

  const fetchProducts = async () => {
    setIsProductsLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(handleProductsOrder(data));
      setFilteredProducts(handleProductsOrder(data));
      setIsProductsLoading(false);
    } catch (error) {
      setIsProductsLoading(false);
      alert(error);
    }
  };

  const fetchCategories = async () => {
    setIsProductsLoading(true);
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setProductsCategories(data);
      setIsProductsLoading(false);
    } catch (error) {
      setIsProductsLoading(false);
      alert(error);
    }
  };

  useEffect(() => {
    if (isProductsLoading) {
      fetchProducts();
    }
    fetchCategories();
  }, []);

  const convertPrice = (currency, productPrice) => {
    let convertedPrice;

    if (currency === "USD") return productPrice;

    convertedPrice = Number(productPrice) * rates[currency];

    return convertedPrice.toFixed(2);
  };

  const getTotalCartValue = () => {
    const shoppingCartProductsValues = shoppingCartProducts.map((item) => {
      return Number(convertPrice(currency, item.price)) * item.quantity;
    });

    const totalCartValue = shoppingCartProductsValues.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );

    setTotalCartPrice(totalCartValue.toFixed(2));
  };

  useEffect(() => {
    if (shoppingCartProducts.length > 0) {
      getTotalCartValue();
    }
  }, [shoppingCartProducts, setShoppingCartProducts, currency]);

  useEffect(() => {
    if (shoppingCartProducts.length === 0) {
      setTotalItemsQuantity(0);
      return;
    }

    let shoppingCartQuantities = shoppingCartProducts.map((item) =>
      Number(item.quantity)
    );

    let totalQuantity = shoppingCartQuantities.reduce(
      (prevValue, currentValue) => prevValue + currentValue
    );

    setTotalItemsQuantity(totalQuantity);
  }, [shoppingCartProducts]);

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        productsCategories,
        isProductsLoading,
        setIsProductsLoading,
        shoppingCartProducts,
        setShoppingCartProducts,
        currency,
        setCurrency,
        currencyValueRef,
        categoryValueRef,
        categoryValue,
        setCategoryValue,
        convertPrice,
        totalCartPrice,
        setTotalCartPrice,
        getTotalCartValue,
        productsOrder,
        setProductsOrder,
        handleProductsOrder,
        isShoppingCartVisible,
        setIsShoppingCartVisible,
        totalItemsQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

export const useGlobalContext = () => {
  return useContext(AppContext);
};
