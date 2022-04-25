import Nav from "./components/Nav";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <div className="checkout-wrapper">
        <Products />
        <ShoppingCart />
      </div>

      <Footer />
    </>
  );
}

export default App;
