import axios from "axios";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";



export function PaymentSummary({paymentSummary , LoadCart}) {
      const navigate = useNavigate();

  const createOrder = async () => {
   await axios.post("/api/orders");
   await LoadCart();
   navigate("/orders");
  }     

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      {paymentSummary && (
        <>
          {/* make sure numeric values are defined so formatMoney doesn't produce NaN */}
          {paymentSummary.totalItems == null && (paymentSummary.totalItems = 0)}
          {paymentSummary.productCostCents == null && (paymentSummary.productCostCents = 0)}
          {paymentSummary.shippingCostCents == null && (paymentSummary.shippingCostCents = 0)}
          {paymentSummary.totalCostBeforeTaxCents == null && (paymentSummary.totalCostBeforeTaxCents = 0)}
          {paymentSummary.taxCents == null && (paymentSummary.taxCents = 0)}
          {paymentSummary.totalCostCents == null && (paymentSummary.totalCostCents = 0)}
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button className="place-order-button button-primary"
          onClick = {createOrder}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
