import Product from "./Product";
import ProductsActions from "./ProductsActions";

import { useGlobalContext } from "../context";
import { useEffect } from "react";

const Products = () => {
  const { products, isProductsLoading, categoryValue, filteredProducts } =
    useGlobalContext();

  useEffect(() => {
    if (categoryValue !== "All") {
      products = products.filter((item) => item.category === categoryValue);
    }
  });

  return (
    <div className="products-wrapper">
      <ProductsActions />
      {!isProductsLoading && products.length === 0 && (
        <h3>No products available.</h3>
      )}
      <ul className="products">
        {isProductsLoading && <div className="loading-spinner"></div>}
        {!isProductsLoading &&
          filteredProducts.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
      </ul>
    </div>
  );
};

export default Products;
