import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter_product: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "All",
    brand:"All",
    colors: "All",
    maxPrice: 0,
    minPrice: 0,
    price: 0,
  },
};
export const productSlice = createSlice({
  name: "filterProduct",
  initialState,
  reducers: {
    loadFilterProduct: (state, action) => {
      const priceArr = action.payload.map((item) =>  Number(item.productPrice));
      const maxPrice = priceArr.length ? Math.max(...priceArr) : 0;
      const minPrice = priceArr.length ? Math.min(...priceArr) : 0;
      state.filter_product = [...action.payload];
      state.all_products = [...action.payload];
      state.filters.maxPrice = maxPrice;
      state.filters.price = maxPrice;
      state.filters.minPrice = minPrice;
    },
    setGridView: (state, action) => {
      state.grid_view = true;
    },
    setListView: (state, action) => {
      state.grid_view = false;
    },
    setSortingValue: (state, action) => {
      state.sorting_value = action.payload;
    },
    updateFilterValue: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },
    sortProducts: (state, action) => {
      let tempSortProduct = [...state.filter_product];

      switch (state.sorting_value) {
        case "lowest":
          tempSortProduct.sort((a, b) => a.productPrice - b.productPrice);
          break;

        case "highest":
          tempSortProduct.sort((a, b) => b.productPrice - a.productPrice);
          break;

        case "a-z":
          tempSortProduct.sort((a, b) =>
            a.productName.localeCompare(b.productName),
          );
          break;

        case "z-a":
          tempSortProduct.sort((a, b) =>
            b.productName.localeCompare(a.productName),
          );
          break;

        default:
          break;
      }
      state.filter_product = tempSortProduct;
    },
    filterProducts: (state, action) => {
      const { text, category, brand, price } = state.filters;
      let tempFilterProduct = [...state.all_products];
      if (text.trim() !== "") {
        tempFilterProduct = tempFilterProduct.filter((item) =>
          item.productName.toLowerCase().includes(text.toLowerCase()),
        );
      }
      if (category !== "All") {
        tempFilterProduct = tempFilterProduct.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase(),
        );
      }
      if(brand !== "All"){
        tempFilterProduct = tempFilterProduct.filter((item)=>item.brand.toLowerCase() === brand.toLowerCase())
      }
      tempFilterProduct = tempFilterProduct.filter(
        (item) => item.productPrice <= price,
      );
      state.filter_product = tempFilterProduct;
    },
    clearFilters: (state, action) => {
      state.filters.text = "";
      state.filters.category = "All";
      state.filters.brand = "All";
      state.filters.colors = "All";
      state.filters.price = state.filters.maxPrice;
    },
  },
});
export const {
  loadFilterProduct,
  setGridView,
  setListView,
  setSortingValue,
  updateFilterValue,
  sortProducts,
  filterProducts,
  clearFilters,
} = productSlice.actions;
export const filterProduct = productSlice.reducer;
