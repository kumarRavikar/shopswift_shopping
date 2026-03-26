import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {productReducer} from "../redux/productSlice"
import { filterProduct } from "./filterSlice"
import {cartReducer} from "../redux/AddToCartSlice"
import { userReducer } from "./userSlice"

import {
  
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
 const rootReducer = combineReducers({
         product:productReducer,
         filterProduct:filterProduct,
         addToCart:cartReducer,
         user:userReducer
 })
const persistedReducer = persistReducer(persistConfig, rootReducer)
 export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
// export const store = configureStore({
//     reducer:{
//         product:productReducer,
//          filterProduct:filterProduct,
//          addToCart:cartReducer,
//          user:userReducer
//     }
// })