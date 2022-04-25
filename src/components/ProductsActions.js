import { useGlobalContext } from "../context";

import { HiSortDescending, HiSortAscending } from "react-icons/hi";

const ProductsActions = () => {
  const {
    currencyValueRef,
    categoryValueRef,
    setCurrency,
    productsOrder,
    setProductsOrder,
    productsCategories,
    products,
    setFilteredProducts,
  } = useGlobalContext();

  const setOrderIcon = () => {
    if (productsOrder === "descending") {
      return <HiSortDescending />;
    } else {
      return <HiSortAscending />;
    }
  };

  const changeProductsOrder = () => {
    if (productsOrder === "descending") {
      setProductsOrder("ascending");
    } else {
      setProductsOrder("descending");
    }
  };

  return (
    <div className="products-actions-wrapper">
      <div className="category-wrapper action-wrapper">
        <span>Category:</span>
        <select
          ref={categoryValueRef}
          onChange={() => {
            const value = categoryValueRef.current.value;
            let newFilteredProducts = products;

            if (value !== "All") {
              newFilteredProducts = products.filter(
                (item) => item.category === categoryValueRef.current.value
              );
            }

            setFilteredProducts(newFilteredProducts);
          }}
        >
          <option>All</option>
          {productsCategories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
      </div>
      <div className="currency-wrapper action-wrapper">
        {" "}
        <span>Currency:</span>
        <select
          ref={currencyValueRef}
          onChange={() => {
            setCurrency(currencyValueRef.current.value);
          }}
        >
          <option>USD</option>
          <option>EURO</option>
          <option>GBP</option>
        </select>
      </div>

      <div className="products-order-wrapper action-wrapper">
        <span>Order:</span>
        <button onClick={changeProductsOrder}>{setOrderIcon()}</button>
      </div>
    </div>
  );
};

export default ProductsActions;
