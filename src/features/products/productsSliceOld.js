import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsApi";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  deleteSuccess: false,
  isError: false,
  error: null,
};

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const products = fetchProducts();
  return products;
});
export const addProduct = createAsyncThunk("products/addProduct", async (productData) => {
  const product = postProduct(productData);
  return product;
});
export const removeProduct = createAsyncThunk("products/removeProduct", async (id, thunkAPI) => {
  const product = await deleteProduct(id);
  thunkAPI.dispatch(removeProductFromState(id));
  return product;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
    removeProductFromState: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.products = [];
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postSuccess = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.postSuccess = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(removeProduct.pending, (state, action) => {
        state.isLoading = true;
        state.deleteSuccess = false;
        state.isError = false;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = true;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { togglePostSuccess, toggleDeleteSuccess, removeProductFromState } = productSlice.actions;

export default productSlice.reducer;
