import React from 'react'
//import { useFilterContext } from '../contex/FilterProductContext'
import GridView from './GridView';
import ListView from "./ListView"
import { useSelector } from 'react-redux';
const ProductList = () => {
  const {filter_product, grid_view} = useSelector((state)=>state.filterProduct);
    if(grid_view){
    return <GridView products={filter_product}/>
  }

  return <ListView products={filter_product}/>

}

export default ProductList