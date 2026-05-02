import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";

import logoWhite from "../assets/images/icons/logo-white.png";
import mobileLogoWhite from "../assets/images/icons/mobile-logo-white.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";

import "./Header.css";

export function Header({ cart }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchText(search);
    }
  }, [searchParams]);

  let totalQuantity = 0;
  if (cart && Array.isArray(cart)) {
    cart.forEach((cartItem)=>{
    totalQuantity += cartItem.quantity;
    });
  }
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logoWhite} />
          <img className="mobile-logo" src={mobileLogoWhite} />
        </NavLink>
      </div>
      Nav
      <div className="middle-section">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <button className="search-button" onClick={() => navigate(`/?search=${searchText}`)}>
          <img className="search-icon" src={searchIcon} />
        </button>
      </div>
      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>
        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
