import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/orderspage";
import { Tracking } from "./pages/Tracking";
import { ErrorPage } from "./pages/Errorpage";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const LoadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    LoadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} LoadCart={LoadCart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} LoadCart={LoadCart}/>} />
      <Route path="tracking/:orderId/:productId" element={<Tracking />} />
      <Route path="*" element={<ErrorPage cart={cart} />} />
    </Routes>
  );
}

export default App;
