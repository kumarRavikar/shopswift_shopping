import React from 'react'
//import { useFilterContext } from '../contex/FilterProductContext'
import GridView from './GridView';
import ListView from "./ListView"
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters } from '../redux/filterSlice';
import styles from "../styles/productFallback.module.css"
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
const ProductList = () => {
  const dispatch = useDispatch()
  const {filter_product, grid_view, filters} = useSelector((state)=>state.filterProduct);
  if (!filter_product?.length) {
    return (
      <div className={styles.noProducts}>
  <div className={styles.noProductsBox}>
   
     <MdOutlineRemoveShoppingCart className={styles.noProductsImg}/>
    <h2>No Products Found</h2>

    <p>
      No results in <b>{filters.category}</b> /{" "}
      <b>{filters.brand}</b>
    </p>

    <button
      className={styles.resetBtn}
      onClick={() => dispatch(clearFilters())}
    >
      Reset Filters
    </button>
  </div>
</div>
    );
  }
    if(grid_view){
    return <GridView products={filter_product}/>
  }

  return <ListView products={filter_product}/>

}

export default ProductList