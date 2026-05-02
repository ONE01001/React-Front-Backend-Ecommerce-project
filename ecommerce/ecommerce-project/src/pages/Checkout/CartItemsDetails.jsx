import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";

export function CartItemDetails({ cartItem , LoadCart}) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
    
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await LoadCart();
  };

  const updateQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity)
    });
    await LoadCart();
    setIsUpdating(false);
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
            {isUpdating ? (
              <input 
                className="quantity-input"
                type="number" 
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    updateQuantity();
                  } else if (event.key === 'Escape') {
                    setQuantity(cartItem.quantity);
                    setIsUpdating(false);
                  }
                }}
              />
            ) : (
              <span className="quantity-label">{quantity}</span>
            )}
          </span>
          <span className="update-quantity-link link-primary" onClick={() => {
            if (isUpdating) {
              updateQuantity();
            } else {
              setIsUpdating(true);
            }
          }}>Update</span>
          <span className="delete-quantity-link link-primary"
            onClick ={deleteCartItem}>
            Delete</span>
        </div>
      </div>
    </>
  );
}
