import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import ProductList from "./pages/products/ProductList.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx";
import MyOrders from "./pages/orders/OrderList.jsx";
import OrderDetail from "./pages/orders/OrderDetail.jsx";
import ProductCreate from "./pages/products/ProductCreate.jsx";
import AdminProductList from "./pages/products/AdminProductList.jsx";
import ProductEdit from "./pages/products/ProductEdit.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/products/:id/edit" element={<ProductEdit />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<MyOrders />} />


        <Route path="/orders/:id" element={<OrderDetail />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
