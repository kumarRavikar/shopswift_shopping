import React from "react";
import styles from "../styles/CartItems.module.css";
import { FaTrash } from "react-icons/fa";
import PriceFormate from "./PriceFormate";
import CartAmount from "./CartAmount";
import { useDispatch } from "react-redux";
import { decQuentity, incQuantity, removeProduct } from "../redux/AddToCartSlice";

const CartItems = ({ id, name, image,  price, amount }) => {
   const dispatch = useDispatch();
  return (
    <div className={styles.cartRow}>
      
      {/* Product Info */}
      <div className={styles.productInfo}>
        <img src={image} alt={name} className={styles.productImg} />
        <div>
          <p className={styles.productName}>{name}</p>
      </div>
      </div>
      {/* Price */}
      <p className={styles.center}><PriceFormate price={price}/></p>

      {/* Quantity */}
      <p className={styles.center}><CartAmount amount={amount} descAmount={()=>dispatch(decQuentity(id))} incAmount={()=>dispatch(incQuantity(id))}/></p>

      {/* Subtotal */}
      <p className={styles.center}><PriceFormate price={price * amount}/></p>

      {/* Remove */}
      <button className={styles.removeBtn}>
        <FaTrash onClick={()=>dispatch(removeProduct(id))}/>
      </button>
      
    </div>
  );
};

export default CartItems;
