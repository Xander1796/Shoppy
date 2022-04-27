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
        <h1>
          <MdOutlineShoppingCart /> Shoppy
        </h1>
        <button
          className="shopping-cart-btn btn btn-green"
          onClick={openShoppingCart}
          title="shopping cart"
        >
          <MdOutlineShoppingCart />
          <span className="quantity btn btn-accent">{totalItemsQuantity}</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
