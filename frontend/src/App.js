import Footer from "./components/Footer";
import Header from "./components/Header";
import "./css/base.css";
import "./css/main.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import HomeScreen from "./screen/HomeScreen";
import EventsScreen from "./screen/EventsScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
import UserListScreen from "./screen/UserListScreen";
import UerEditScreen from "./screen/UserEditSreen";
import ProductListScreen from "./screen/ProductListScreen";
import ProductEditScreen from "./screen/ProductEditScreen";
import OrderListScreen from "./screen/OrderListScreen";
import About from "./components/About";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/event" element={<EventsScreen />} />
        <Route path="/event/:id" element={<ProductScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeolder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/ordelist" element={<OrderListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UerEditScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/cart" element={<CartScreen />}>
          <Route path="/cart/:id" element={<CartScreen />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
