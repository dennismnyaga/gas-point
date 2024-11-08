import Home from "./pages/Home"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";


const App = () => {
  return (


    <div className="min-h-screen bg-slate-200">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
