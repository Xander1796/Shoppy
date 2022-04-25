import ShoppingCartProduct from "./ShoppingCartProduct";

import useCurrency from "../customHooks/useCurrency";
import { useGlobalContext } from "../context";

import { IoMdClose } from "react-icons/io";

const ShoppingCart = () => {
  const {
    shoppingCartProducts,
    currency,
    totalCartPrice,
    isShoppingCartVisible,
    setIsShoppingCartVisible,
  } = useGlobalContext();

  const currencySign = useCurrency(currency);

  const hideShoppingCart = () => {
    setIsShoppingCartVisible(false);
  };

  return (
    <div
      className={`shopping-cart-wrapper ${isShoppingCartVisible ? "open" : ""}`}
    >
      <div className="shopping-cart-overlay" onClick={hideShoppingCart}></div>
      <div className="shopping-cart">
        <button
          className="close-shopping-cart-btn"
          onClick={hideShoppingCart}
          title="close"
        >
          <IoMdClose />
        </button>
        <h3 className="title">
          {shoppingCartProducts.length > 0
            ? "Products in your shopping cart"
            : "No products in your shopping cart"}
        </h3>

        {shoppingCartProducts.length > 0 && (
          <>
            <ul className="cart-products">
              {shoppingCartProducts.map((product) => {
                return (
                  <ShoppingCartProduct key={product.id} product={product} />
                );
              })}
            </ul>

            <h3 className="cart-total">
              Total: <span>{currencySign}</span>
              <span>{totalCartPrice}</span>
            </h3>

            <button className="shopping-cart-cta btn">Continue</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
