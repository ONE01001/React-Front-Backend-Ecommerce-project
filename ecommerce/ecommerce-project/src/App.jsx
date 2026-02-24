import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrdersPage } from "./pages/orderspage";
import { Tracking } from "./pages/Tracking";
import { ErrorPage } from "./pages/Errorpage";
import { Routes, Route } from "react-router";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
