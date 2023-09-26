import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/Homepage";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/app" element={<AppLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
