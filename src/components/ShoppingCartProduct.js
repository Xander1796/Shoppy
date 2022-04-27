import { useEffect, useState } from "react";

import { useGlobalContext } from "../context";
import useCurrency from "../customHooks/useCurrency";

import { BsTrashFill, BsFillInfoCircleFill } from "react-icons/bs";

//components
import ProductQuantity from "./ProductQuantity";

const ShoppingCartProduct = ({ product }) => {
  const {
    shoppingCartProducts,
    setShoppingCartProducts,
    currency,
    convertPrice,
    getTotalCartValue,
    setLocalStorage,
  } = useGlobalContext();

  const [itemQuantity, setItemQuantity] = useState(product.quantity);

  const currencySign = useCurrency(currency);

  useEffect(() => {
    const targetedProductIndex = shoppingCartProducts.findIndex(
      (item) => item.id === product.id
    );
    shoppingCartProducts[targetedProductIndex].quantity = itemQuantity;
    setShoppingCartProducts(shoppingCartProducts.slice());
    setLocalStorage(shoppingCartProducts);
    getTotalCartValue();
  }, [itemQuantity]);

  useEffect(() => {
    setItemQuantity(product.quantity);
  }, [shoppingCartProducts]);

  const deleteShoppingCartItem = (id) => {
    const newShoppingCartProducts = shoppingCartProducts.filter(
      (item) => item.id !== id
    );

    setShoppingCartProducts(newShoppingCartProducts);
    setLocalStorage(newShoppingCartProducts);
  };

  return (
    <li className="cart-product">
      <div className="cart-product-content">
        <img src={product.image} alt={product.title} />
        <h4>{product.title}</h4>
        <div className="quantity-and-value">
          <span className="cart-product-value">
            <span>{currencySign}</span>
            {Number(
              convertPrice(currency, product.price) * product.quantity
            ).toFixed(2)}
          </span>
          <ProductQuantity props={{ itemQuantity, setItemQuantity }} />
          <div className="cart-product-info-wrapper">
            <BsFillInfoCircleFill />
            <span className="cart-product-description">
              {product.description}
            </span>
          </div>

          <button
            className="delete-cart-product btn btn-red"
            title="Remove item"
            onClick={() => {
              deleteShoppingCartItem(product.id);
            }}
          >
            <BsTrashFill />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ShoppingCartProduct;
