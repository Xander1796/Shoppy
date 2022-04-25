import { MdOutlineShoppingCart } from "react-icons/md";
import { useGlobalContext } from "../context";

const Nav = () => {
  const {
    setIsShoppingCartVisible,
    isShoppingCartVisible,
    totalItemsQuantity,
  } = useGlobalContext();

  const openShoppingCart = () => {
    setIsShoppingCartVisible(!isShoppingCartVisible);
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <h1>Shoppy</h1>
        <button className="shopping-cart-btn" onClick={openShoppingCart}>
          <MdOutlineShoppingCart />
          <span className="quantity">{totalItemsQuantity}</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
