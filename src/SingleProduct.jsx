import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
//import { UseProductContext } from "./contex/productContext";
import PageNavigation from "./components/PageNavigation";
import styles from "../src/styles/SingleProduct.module.css";
import PriceFormate from "./components/PriceFormate";
import { TbTruckDelivery, TbReplaceFilled } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import MyImages from "./components/MyImages";
import Stars from "./components/Stars";
import AddToCart from "./components/AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./redux/productSlice";
const SINGLE_API = "https://backend-shopswift-shopping.onrender.com/api/products/singleproduct";

export const SingleProduct = () => {
  const { _id } = useParams();
  const { singleProduct, isSingleLoading } = useSelector((state)=>state.product)
  const dispatch = useDispatch()
  const {  productName, productDesc, productImg , productPrice, rating, stock } =
    singleProduct || {};

  useEffect(() => {
   dispatch( fetchSingleProduct(`${SINGLE_API}/${_id}`));
  }, [dispatch,_id]);

  if (isSingleLoading) {
    return <div className={styles.loader}>Loading product details...</div>;
  }

  return (
    <section className={styles.wrapper}>
      <PageNavigation title={productName} />

      <div className={styles.card}>
        <div className={styles.imageSection}>
          {productImg && <MyImages images={productImg} />}
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{productName}</h1>

          <div className={styles.meta}>
            <Stars rating={rating?.rate}/>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <del>
              MRP: <PriceFormate price={productPrice + 25000} />
            </del>
            <span className={styles.price}>
              Deal of the day: <PriceFormate price={productPrice} />
            </span>
            <p
              className={`${styles.stock} ${
                stock > 0 ? styles.inStock : styles.outOfStock
              }`}
            >
              Availability:
              <span>{stock > 0 ? " In stock" : " Out of stock"}</span>
            </p>
            <p className={styles.description}>{productDesc}</p>
            <div className={styles.services}>
              <div className={styles.serviceItem}>
                <TbTruckDelivery className={styles.icon} />
                <p>Free Delivery</p>
              </div>

              <div className={styles.serviceItem}>
                <TbReplaceFilled className={styles.icon} />
                <p>Easy Replacement</p>
              </div>

              <div className={styles.serviceItem}>
                <MdOutlineSecurity className={styles.icon} />
                <p>2 Month Warranty</p>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <AddToCart product={singleProduct}/>
        </div>
      </div>
    </section>
  );
};
