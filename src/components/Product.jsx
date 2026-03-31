import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from "../styles/Product.module.css"
import PriceFormate from './PriceFormate';
const Product = ({ _id, productName, productImg , productPrice, category }) => {
  return (
   <NavLink to={`/products/${_id}`} className={styles.card}>
      <div className={styles.cardInner}>
        <figure className={styles.figure}>
          <img src={productImg?.[0]?.url} alt={productName} className={styles.image}/>
          <figcaption className={styles.category}>{category}</figcaption>
        </figure>

        <div className={styles.cardData}>
          <h3 className={styles.title}>{productName}</h3>
          <p className={styles.price}><PriceFormate price={productPrice}/></p>
        </div>
      </div>
    </NavLink>
  )
}

export default Product