import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";

export function CartItemDetails({ cartItem , LoadCart}) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
    
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await LoadCart();
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <input 
              className="quantity-input"
              type="number" 
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </span>
          <span className="update-quantity-link link-primary">Update</span>
          <span className="delete-quantity-link link-primary"
            onClick ={deleteCartItem}>
            Delete</span>
        </div>
      </div>
    </>
  );
}
