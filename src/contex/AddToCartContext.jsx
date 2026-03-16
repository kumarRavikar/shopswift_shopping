import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/AddToCartReducer"
const CartContext = createContext();
const getLocalData=()=>{
  try {
    const localData = localStorage.getItem("cartItems");

    if (!localData || localData === "undefined") {
      return [];
    }

    return JSON.parse(localData);
  } catch (error) {
    console.error("Error parsing cart data:", error);
    return [];
  }
}
const initialState={
  cart:getLocalData(),
  total_amount:'',
  total_items:'',
  shipping_fee:250
}
export const CartContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const addToCart=(id, colors,amount, product)=>{
      dispatch({type:'ADD_TO_CART', payload:{id, colors,amount, product}})
    }
    const removeProduct=(id)=>{
      dispatch({type:'REMOVE_PRODUCT',payload:id})
    }
    const clearCart=()=>{
      dispatch({type:'CLEAR_CART'})
    }
    const setIncrement=(id)=>{
      dispatch({type:'INCREASE_AMOUNT', payload:id})
    }
    const setDecrement=(id)=>{
      dispatch({type:'DECREASE_AMOUNT', payload:id})
    }
    useEffect(()=>{
      // dispatch({type:'NUMBER_OF_CART_ITEMS'})
      // dispatch({type:'CALCULATE_SUBTOTAL'})
      dispatch({type:'CALCULATE_TOTAL_ITEM_OR_TOTAL_AMOUNT'})
      localStorage.setItem('cartItems',JSON.stringify(state.cart))
    },[state.cart])
 return(
    <CartContext.Provider value={{...state,addToCart,removeProduct,clearCart,setIncrement,setDecrement}}>
        {children}
    </CartContext.Provider>
 )
}
export const useAddToCartContext = ()=>useContext(CartContext);
