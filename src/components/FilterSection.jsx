import React, { useEffect } from "react";
//import { useFilterContext } from "../contex/FilterProductContext";
import styles from "../styles/FilterSection.module.css";
import PriceFormate from "./PriceFormate";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  filterProducts,
  loadFilterProduct,
  sortProducts,
  updateFilterValue,
} from "../redux/filterSlice";
const FilterSection = () => {
  const dispatch = useDispatch();
  const {
    filters: { text, brand, category, price, maxPrice, minPrice },
    all_products,
    sorting_value,
  } = useSelector((state) => state.filterProduct);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
   if(products && products.length > 0){
    dispatch(loadFilterProduct(products));
  }
  }, [products, dispatch]);

  useEffect(() => {
     if(!all_products?.length){
         return
     }
    dispatch(filterProducts());
    dispatch(sortProducts());
  
  }, [text, category,brand ,price, sorting_value,all_products, dispatch]);

  const getUniqueData = (data, property) => {
    const  newVal = data.map((curEle) => curEle[property]);
    return ["All", ...new Set(newVal)];
  };
  let uniqueData = all_products?.length ? getUniqueData(all_products, "category"):[];
  let getUniqueBrand =all_products?.length ? getUniqueData(all_products,"brand"):[];
  if(all_products.length === 0){
    return <h2>No product found</h2>
  }
  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.searchBox}>
          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <input
              type="text"
              name="text"
              value={text}
              onChange={(e) =>
                dispatch(
                  updateFilterValue({
                    name: e.target.name,
                    value: e.target.value,
                  }),
                )
              }
              className={styles.inputFild}
              placeholder="SEARCH"
            />
          </form>
        </div>
        <div className={styles.priceCategory}>
          <h3>Category</h3>
          {uniqueData.map((currEle) => (
            <button
              type="button"
              key={currEle}
              className={
                category === currEle
                  ? `${styles.listItem} ${styles.active}`
                  : styles.listItem
              }
              name="category"
              value={currEle}
              onClick={(e)=>dispatch(updateFilterValue({
                    name: e.target.name,
                    value: e.target.value,
                  }))}
            >
              {currEle.toUpperCase()}
            </button>
          ))}
        </div>
        <div className={styles.priceCategory}>
          <h3>Brand</h3>
          {getUniqueBrand.map((currEle) => (
            <button
              type="button"
              key={currEle}
              className={
                brand === currEle
                  ? `${styles.listItem} ${styles.active}`
                  : styles.listItem
              }
              name="brand"
              value={currEle}
              onClick={(e)=>dispatch(updateFilterValue({
                    name: e.target.name,
                    value: e.target.value,
                  }))}
            >
              {currEle.toUpperCase()}
            </button>
          ))}
        </div>
        <div className={styles.priceCategory}>
          <h3>Price</h3>

          <p className={styles.priceValue}>
            <PriceFormate price={price} />
          </p>

          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={(e) => dispatch(updateFilterValue({
                    name: e.target.name,
                    value: Number(e.target.value),
                  }))}
          />
        </div>
        <div>
          <button
            className={styles.clearBtn}
            onClick={()=>dispatch(clearFilters())}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
