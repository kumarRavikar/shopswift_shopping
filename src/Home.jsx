import React, { useEffect } from 'react'
import HomePage from './components/HomePage'
import front from "../src/assets/Photo/front.png";
import Services from './components/Services';
import Trusted from './components/Trusted';
import FeatureProducts from './components/FeatureProducts';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/productSlice';
export const Home = () => {
  const dispatch = useDispatch()
  const homePageDetails = {
    name:"ShopeSwift",
    img:front,
    desc:" ShopSwift is your one-stop destination for smart, stylish, and affordable shopping. Discover trending products, exclusive deals, and a seamless shopping experience designed just for you. Shop faster, smarter, and better — because great products deserve a great platform."
  }
  useEffect(()=>{
     dispatch(fetchProducts())
  },[dispatch])
  return(
    <>
    <HomePage pageDetails = {homePageDetails}/>
    <FeatureProducts/>
    <Services/>
    <Trusted/>
    </>
    )
}
