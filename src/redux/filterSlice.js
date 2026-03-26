import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter_product: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "All",
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
      const priceArr = action.payload.map((item) => item.price);
      const maxPrice = Math.max(...priceArr);
      const minPrice = Math.min(...priceArr);
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
          tempSortProduct.sort((a, b) => a.price - b.price);
          break;

        case "highest":
          tempSortProduct.sort((a, b) => b.price - a.price);
          break;

        case "a-z":
          tempSortProduct.sort((a, b) => a.title.localeCompare(b.title));
          break;

        case "z-a":
          tempSortProduct.sort((a, b) => b.title.localeCompare(a.title));
          break;

        default:
          break;
      }
      state.filter_product = tempSortProduct;
    },
    filterProducts: (state, action) => {
      const { text, category, price } = state.filters;
      let tempFilterProduct = [...state.all_products];
      if (text.trim() !== "") {
        tempFilterProduct = tempFilterProduct.filter((item) =>
          item.title.toLowerCase().includes(text.toLowerCase()),
        );
      }
      if (category !== "All") {
        tempFilterProduct = tempFilterProduct.filter(
          (item) => item.category === category,
        );
      }
      tempFilterProduct = tempFilterProduct.filter(
        (item) => item.price <= price,
      );
      state.filter_product = tempFilterProduct;
    },
    clearFilters: (state, action) => {
      state.filters.text = "";
      state.filters.category = "All";
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
