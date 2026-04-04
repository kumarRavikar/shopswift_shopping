import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API = "https://backend-shopswift-shopping.onrender.com/api/products/all_products";
const enhanceProduct = (product) => {
  return {
    ...product,
    stock: product.stock || 10,
    rating: {
      rate: (Math.random() * (5 - 3) + 3).toFixed(1), // 3.0 to 5.0
      count: Math.floor(Math.random() * 200) + 1, // 1–200 reviews
    },
    colors: ["red", "blue", "green"],
  };
};

const initialState = {
  isLoading: false,
  products: [],
  featuredProducts: [],
  isError: false,
  isSingleLoading: false,
  singleProduct: {},
};
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
   async (_, thunkAPI) => {
    try {
      const res = await axios.get(API);
      return res.data.products.map(enhanceProduct);
       
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (url) => {
    const res = await axios.get(url);
    return enhanceProduct(res.data.product);
  },
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;

        state.featuredProducts = action.payload

        state.isError = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      //Single Products
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.isSingleLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isSingleLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.isSingleLoading = false;
        state.isError = true;
      });
  },
});
export const productReducer = productSlice.reducer;
