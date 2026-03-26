import { createSlice } from "@reduxjs/toolkit";

const getLocalData =()=>{
   try {
     const localData = localStorage.getItem("cartItems");
     if(!localData || localData === 'undefined'){
        return [];
     }
     return JSON.parse(localData);
   } catch (error) {
      console.log("cart LocalStorage :", error)
      return [];
   }
}
const initialState = {
   cart:getLocalData(),
   total_amount:0,
   total_items:0,
   shipping_fee:25
}
export const AddToCartSlice = createSlice({
    name:'addToCart',
    initialState,
    reducers:{
        //actions
      addToCart:(state,action)=>{
        const {id, colors, amount, product} = action.payload
         const existingItem = state.cart.find((item)=>item.id === item.id + id+colors);
         if(existingItem){
            state.cart = state.cart.map((item)=>{
                if(item.id === id + colors){
                    let newAmount = item.amount + amount
                    if(newAmount >= item.max){
                        newAmount = item.max
                    }
                    return {...item, amount:newAmount}
                }
                return item
            })
         }else{
            const cartProduct ={
               id : id + colors,
               name: product.title,
               colors,
               amount,
               image:product.image,
               price:product.price,
               max : product.stock
            };
            state.cart.push(cartProduct)
         }
      },
      removeProduct:(state,action)=>{
          state.cart = state.cart.filter((item)=>item.id !== action.payload)
      },
      clearCart:(state,action)=>{
         state.cart = []
      },
      incQuantity:(state,action)=>{
         state.cart = state.cart.map((item)=>{
            if(item.id === action.payload){
               let incValue = item.amount + 1
               if(incValue >= item.max){
                  incValue = item.max
               }
               return {...item, amount:incValue}
            }
            return item
         })
      },
      decQuentity:(state,action)=>{
         state.cart = state.cart.map((item)=>{
            if(item.id === action.payload){
               let decValue = item.amount - 1
               if(decValue <= 1)decValue = 1
               return{...item, amount:decValue}
            }
            return item
         })
      },
      totalAmount:(state, action)=>{
         const {total_amount, total_items} = state.cart.reduce(
            (acc,itme)=>{
               acc.total_items += itme.amount
               acc.total_amount += itme.amount * itme.price
               return acc
            },{
               total_amount:0,
               total_items:0
            }
         )
         state.total_amount = total_amount
         state.total_items = total_items
      }
    }
})
export const cartReducer = AddToCartSlice.reducer;
export const {addToCart,removeProduct,clearCart,incQuantity, decQuentity,totalAmount} = AddToCartSlice.actions