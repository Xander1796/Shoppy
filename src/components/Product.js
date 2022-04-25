import { useRef } from "react";
import useCurrency from "../customHooks/useCurrency";
import { useGlobalContext } from "../context";

import { MdOutlineShoppingCart } from "react-icons/md";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Product = ({ product }) => {
  const {
    setShoppingCartProducts,
    shoppingCartProducts,
    currency,
    convertPrice,
  } = useGlobalContext();

  const quantityRef = useRef();

  const handleShoppingCartItem = (id) => {
    let isItemAlreadyInCart = false;
    let productQuantity = Number(quantityRef.current.textContent);

    if (shoppingCartProducts.some((item) => item.id === id))
      isItemAlreadyInCart = true;

    if (!isItemAlreadyInCart) {
      product = {
        ...product,
        quantity: productQuantity,
      };

      setShoppingCartProducts([...shoppingCartProducts, product]);
    }

    if (isItemAlreadyInCart) {
      let targetedItemIndex = shoppingCartProducts.findIndex(
        (item) => item.id === id
      );

      let shoppingCartItemQuantity = Number(
        shoppingCartProducts[targetedItemIndex].quantity
      );

      shoppingCartProducts[targetedItemIndex].quantity =
        productQuantity + shoppingCartItemQuantity;
      const slicedArray = shoppingCartProducts.slice();
      setShoppingCartProducts(slicedArray);
    }

    quantityRef.current.textContent = 1;
  };

  const handleQuantity = (e) => {
    let quantity = Number(quantityRef.current.textContent);
    if (e.target.classList.contains("increase-quantity")) quantity++;
    if (e.target.classList.contains("decrease-quantity") && quantity !== 1)
      quantity--;
    quantityRef.current.textContent = quantity;
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
        <div className="product-quantity-wrapper">
          <button className="decrease-quantity" onClick={handleQuantity}>
            <HiChevronDown />
          </button>
          <span ref={quantityRef} className="quantity">
            1
          </span>
          <button className="increase-quantity" onClick={handleQuantity}>
            <HiChevronUp />
          </button>
        </div>
        <button
          className="product-cta btn"
          onClick={() => {
            handleShoppingCartItem(product.id);
          }}
        >
          {" "}
          <MdOutlineShoppingCart />
          Add to cart
        </button>
      </div>
    </li>
  );
};

export default Product;
