import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const ProductQuantity = ({ props }) => {
  const handleQuantity = (e) => {
    if (e.target.classList.contains("increase-quantity"))
      props.setItemQuantity(props.itemQuantity + 1);
    if (
      e.target.classList.contains("decrease-quantity") &&
      props.itemQuantity > 1
    )
      props.setItemQuantity(props.itemQuantity - 1);
  };

  return (
    <div className="product-quantity-wrapper">
      <button
        className={`decrease-quantity btn btn-green ${
          props.itemQuantity > 1 ? "active" : "inactive"
        }`}
        onClick={handleQuantity}
      >
        <HiChevronDown />
      </button>
      <span className="quantity">{props.itemQuantity}</span>
      <button
        className="increase-quantity btn btn-green active"
        onClick={handleQuantity}
      >
        <HiChevronUp />
      </button>
    </div>
  );
};

export default ProductQuantity;
