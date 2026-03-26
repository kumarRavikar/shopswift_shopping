import React, { useEffect } from "react";
//import { useAddToCartContext } from "./contex/AddToCartContext";
import CartItems from "./components/CartItems";
import styles from "./styles/Cart.module.css";
import { NavLink } from "react-router-dom";
import PriceFormate from "./components/PriceFormate";
//import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch, useSelector} from 'react-redux'
import { clearCart, totalAmount } from "./redux/AddToCartSlice";
const Cart = () => {
  const { cart, total_amount, shipping_fee } = useSelector((state)=>state.addToCart);
  const dispatch = useDispatch()
  //const { user, isAuthenticated } = useAuth0();
  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>

        <NavLink to="/products">
          <button className={styles.shopBtn}>Start Shopping</button>
        </NavLink>
      </div>
    );
  }
  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cart))
  },[cart])
  useEffect(()=>{
    dispatch(totalAmount())
  },[dispatch, cart])

  return (
    <>
      <div className={styles.cartContainer}>
        {/* Header */}
        {/* {isAuthenticated ? (
          <div className={styles.userCard}>
            <img src={user.profile} alt={user.name} className={styles.userImage} />
            <p className={styles.username}>{user.name}</p>
          </div>
        ) : (
          <div className="guestCard">
            <p>User has not logged in yet</p>
          </div>
        )} */}

        <div className={styles.cartHeader}>
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
          <p>Remove</p>
        </div>

        <hr className={styles.divider} />

        {/* Cart Items */}
        <div className={styles.cartItems}>
          {cart.map((currEle) => (
            <CartItems key={currEle.id} {...currEle} />
          ))}
        </div>
        <hr className={styles.divider} />
        <div className={styles.cartButtons}>
          <NavLink to="/products">
            <button className={styles.continueBtn}>Continue Shopping</button>
          </NavLink>

          <button className={styles.clearBtn} onClick={()=>dispatch(clearCart())}>
            Clear Cart
          </button>
        </div>
      </div>
      <div className={styles.summaryWrapper}>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>
              <PriceFormate price={total_amount} />
            </span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping Fee</span>
            <span>
              <PriceFormate price={shipping_fee} />
            </span>
          </div>

          <div className={styles.summaryDivider}></div>

          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Grand Total</span>
            <span>
              <PriceFormate price={total_amount + shipping_fee} />
            </span>
          </div>

          <button className={styles.checkoutBtn}>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
