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
const API = "https://fakestoreapi.com/products";

export const SingleProduct = () => {
  const { id } = useParams();
  const { singleProduct, isSingleLoading } = useSelector((state)=>state.product)
  const dispatch = useDispatch()
  const {  title, description, price, rating, stock } =
    singleProduct;

  useEffect(() => {
   dispatch( fetchSingleProduct(`${API}/${id}`));
  }, [dispatch,id]);

  if (isSingleLoading) {
    return <div className={styles.loader}>Loading product details...</div>;
  }

  return (
    <section className={styles.wrapper}>
      <PageNavigation title={title} />

      <div className={styles.card}>
        <div className={styles.imageSection}>
          {singleProduct.images && <MyImages images={singleProduct.images} />}
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.meta}>
            <Stars rating={rating}/>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <del>
              MRP: <PriceFormate price={price + 25000} />
            </del>
            <span className={styles.price}>
              Deal of the day: <PriceFormate price={price} />
            </span>
            <p
              className={`${styles.stock} ${
                stock > 0 ? styles.inStock : styles.outOfStock
              }`}
            >
              Availability:
              <span>{stock > 0 ? " In stock" : " Out of stock"}</span>
            </p>
            <p className={styles.description}>{description}</p>
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
