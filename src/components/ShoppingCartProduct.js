import { useRef, useState } from "react";

import { useGlobalContext } from "../context";
import useCurrency from "../customHooks/useCurrency";

import { BsTrashFill, BsFillInfoCircleFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

const ShoppingCartProduct = ({ product }) => {
  const {
    products,
    shoppingCartProducts,
    setShoppingCartProducts,
    currency,
    convertPrice,
    getTotalCartValue,
    handleProductsOrder,
    setLocalStorage
  } = useGlobalContext();

  const [isInputQuantityCorrect, setIsInputQuantityCorrect] = useState(true);
  const quantityInput = useRef();

  const currencySign = useCurrency(currency);

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
          <input
            type="number"
            min="1"
            value={product.quantity}
            ref={quantityInput}
            onChange={() => {
              product.quantity = Number(quantityInput.current.value);

              if (quantityInput.current.value < 1) {
                setIsInputQuantityCorrect(false);
              }

              if (quantityInput.current.value >= 1) {
                if (!isInputQuantityCorrect) setIsInputQuantityCorrect(true);

                const targetedProductIndex = shoppingCartProducts.findIndex(
                  (item) => item.id === product.id
                );
                shoppingCartProducts[targetedProductIndex].quantity =
                  quantityInput.current.value;
                setShoppingCartProducts(shoppingCartProducts.slice());
                setLocalStorage(shoppingCartProducts);
                getTotalCartValue();
              }
            }}
          />
          <span className="cart-product-value">
            <span>{currencySign}</span>
            {Number(
              convertPrice(currency, product.price) * product.quantity
            ).toFixed(2)}
          </span>
          <div className="cart-product-info-wrapper">
            <BsFillInfoCircleFill />
            <span className="cart-product-description">
              {product.description}
            </span>
          </div>

          <button
            className="delete-cart-product"
            title="Remove item"
            onClick={() => {
              deleteShoppingCartItem(product.id);
            }}
          >
            <BsTrashFill />
          </button>
        </div>
      </div>

      {!isInputQuantityCorrect && (
        <span className="cart-product-error">
          <RiErrorWarningLine />
          The product quantity must be equal or greater than 1
        </span>
      )}
    </li>
  );
};

export default ShoppingCartProduct;
