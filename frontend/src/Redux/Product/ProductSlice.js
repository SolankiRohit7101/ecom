import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    myProduct: [],
    products: [],
  },
  error: null,
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
        product: {
          ...state.product,
          myProduct: [...state.product.myProduct, action.payload],
        },
      };
    },
    addProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
        product: {
          ...state.product,
          products: [...action.payload],
        },
      };
    },
    getProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addProductFail,
  addProductStart,
  addProductSuccess,
  getProductsFail,
  getProductsStart,
  getProductsSuccess,
} = productSlice.actions;

export default productSlice.reducer;
