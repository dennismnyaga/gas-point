import Home from "./pages/Home"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./adminstrator/Admin";


const App = () => {
  return (


    <div className="min-h-screen bg-slate-200">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart/" element={<Cart />} />
        <Route path="checkout/" element={<Checkout />} />
        <Route path="admin/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
