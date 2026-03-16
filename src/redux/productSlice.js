import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API = "https://fakestoreapi.com/products";
const enhanceProduct = (product) => {
  return {
    ...product,
    stock: Math.floor(Math.random() * 10) + 1,
    images: [
      { id: 1, url: product.image },
      { id: 2, url: product.image },
      { id: 3, url: product.image },
    ],
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
  async () => {
    const res = await axios.get(API);
    return res.data.map(enhanceProduct);
  },
);
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (url) => {
    const res = await axios.get(url);
    return enhanceProduct(res.data);
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

        state.featuredProducts = action.payload.filter(
          (item) => item.rating?.rate >= 4.5,
        );

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
