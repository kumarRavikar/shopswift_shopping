import React, { useState } from "react";
import styles from "../styles/AddToCart.module.css";
import CartAmount from "./CartAmount";
import { NavLink } from "react-router-dom";
//import { useAddToCartContext } from "../contex/AddToCartContext";
import {useDispatch} from "react-redux"
import { addToCart } from "../redux/AddToCartSlice";
const AddToCart = ({ product }) => {
  const { id, colors = [], stock } = product;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch()
  const incAmount =()=>{
     amount < stock ? setAmount( amount + 1) : setAmount(stock);
  }
  const descAmount =()=>{
     amount > 1 ? setAmount(amount - 1) : setAmount(1);
  }
  return (
    <div className={styles.cartBox}>
      {colors.length > 0 && stock > 0 && (
        <>
          <p className={styles.colorText}>
            Color:
            <span style={{ backgroundColor: selectedColor }} />
          </p>

          <div className={styles.colors}>
            {colors.map((currColor, i) => (
              <button
                key={i}
                className={`${styles.colorBtn} ${
                  selectedColor === currColor ? styles.active : ""
                }`}
                style={{ backgroundColor: currColor }}
                onClick={() => setSelectedColor(currColor)}
              />
            ))}
          </div>
        </>
      )}
       <CartAmount incAmount={incAmount} amount={amount} descAmount={descAmount}/>
      <NavLink to='/cart'>
        <button
        className={styles.addToCartBtn}
        disabled={stock <= 0}
        onClick={()=>dispatch(addToCart({id, colors:selectedColor,amount, product}))}
      >
        {stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
      </NavLink>
    </div>
  );
};

export default AddToCart;
