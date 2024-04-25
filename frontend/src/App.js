import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Cart from "./pages/cart/Cart";
import Signup from "./Register/Signup";
import Layout from "./Layout/Main_layout";
import Login from "./Register/Login";
import Bags from "./component/Bag/Bags";
import ProductDetail from "./component/ProductDetail";
import Buy from "./component/Buy";
import Checkout from "./component/Checkout";
import Thanks from "./component/Thanks";
import Profile from "./component/Profile";
import Order from "./component/Order";
import EditAddress from "./component/EditAddress";
import AddressDetail from "./component/AddressDetail";
import OrderList from "./component/OrderList"
function App() {
  const [loader, setLoader] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout loaderVal={loader} />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pro_detail/:id" element={<Bags />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/buyproduct/:id" element={<Buy />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/editaddress/:id" element={<EditAddress />} />
          <Route path="/addressDetail" element={<AddressDetail />} />
          <Route path="/orderlist" element={<OrderList />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;