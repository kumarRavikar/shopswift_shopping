import React, { useEffect } from 'react'
import FilterSection from './components/FilterSection'
import Sort from './components/Sort'
import ProductList from './components/ProductList'
import styles from "./styles/ProductNav.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './redux/productSlice'
export const Products = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.product)
   useEffect(()=>{
       dispatch(fetchProducts())
    },[dispatch])
   console.log("products data", products);
  return (
    <div className={styles.container}>
      <aside className={styles.filter}>
        <FilterSection/>
      </aside>
      <section className={styles.productSection}>
        <div>
          <Sort/>
        </div>
        <div className={styles.products}>
          <ProductList/>
        </div>
      </section>
    </div>
  )
}
