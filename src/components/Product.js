import { useState, useEffect } from "react";
import useCurrency from "../customHooks/useCurrency";
import { useGlobalContext } from "../context";

import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineCheck } from "react-icons/hi";

//components
import ProductQuantity from "./ProductQuantity";

const Product = ({ product }) => {
  const {
    setShoppingCartProducts,
    shoppingCartProducts,
    currency,
    convertPrice,
    setLocalStorage,
  } = useGlobalContext();

  const [isAddToCartAnimOpen, setIsAddToCartAnimOpen] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    let timeout;
    if (isAddToCartAnimOpen) {
      timeout = setTimeout(() => {
        setIsAddToCartAnimOpen(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  });

  const handleShoppingCartItem = (id) => {
    let isItemAlreadyInCart = false;

    if (shoppingCartProducts.some((item) => item.id === id))
      isItemAlreadyInCart = true;

    if (!isItemAlreadyInCart) {
      product = {
        ...product,
        quantity: itemQuantity,
      };

      setShoppingCartProducts([...shoppingCartProducts, product]);
      setLocalStorage([...shoppingCartProducts, product]);
    }

    if (isItemAlreadyInCart) {
      let targetedItemIndex = shoppingCartProducts.findIndex(
        (item) => item.id === id
      );

      let shoppingCartItemQuantity = Number(
        shoppingCartProducts[targetedItemIndex].quantity
      );

      shoppingCartProducts[targetedItemIndex].quantity =
        itemQuantity + shoppingCartItemQuantity;
      const slicedArray = shoppingCartProducts.slice();
      setShoppingCartProducts(slicedArray);
      setLocalStorage(slicedArray);
    }

    setItemQuantity(1);

    setIsAddToCartAnimOpen(true);
  };

  const currencySign = useCurrency(currency);

  return (
    <li className="product">
      <span className="category-name">{product.category}</span>
      <img src={product.image} alt={product.title} />
      <h3 className="product-name">{product.title}</h3>
      <div className="product-price-and-cta">
        <span className="product-price">
          Price: <span>{currencySign}</span>
          <span>{convertPrice(currency, product.price)}</span>
        </span>
        <ProductQuantity props={{ itemQuantity, setItemQuantity }} />
        <button
          className="product-cta btn btn-accent"
          onClick={() => {
            handleShoppingCartItem(product.id);
          }}
        >
          {" "}
          <MdOutlineShoppingCart />
          Add to cart
          <span
            className={`add-to-cart-anim-wrapper ${
              isAddToCartAnimOpen ? "active" : ""
            }`}
          >
            <HiOutlineCheck />
          </span>
        </button>
      </div>
    </li>
  );
};

export default Product;
