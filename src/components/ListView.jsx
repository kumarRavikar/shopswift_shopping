import React from 'react'
import PriceFormate from './PriceFormate'
import { NavLink } from 'react-router-dom'
import styles from "../styles/ListView.module.css"
const ListView = ({products}) => {
  return (
    <div className={styles.list} > 
      {products.map(({_id, productName, productImg, productPrice, category,productDesc})=>( 
        <div key={_id} className={styles.card}>
         <figure className={ styles.imageBox}>
          <img src={productImg[0]?.url} alt={productName}/>  
         </figure>
         <div className={styles.content}>
          <h4 className={styles.category}>{category}</h4>
          <h3 className={styles.title}>{productName}</h3>
          <p className={styles.price}><PriceFormate price={productPrice}/></p>
          <p className={styles.desc}>{productDesc.slice(0,80)}...</p>
           </div>
           <NavLink to={`/products/${_id}`} className={styles.link}>
            <button className={styles.btn}>Read More</button>
           </NavLink>
        </div>
      ))}
    </div>
  )
}

export default ListView