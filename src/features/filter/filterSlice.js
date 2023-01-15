import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stocks: false,
  brands: [],
  keyword: "",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleStock: (state) => {
      state.stocks = !state.stocks;
    },
    toggleBrans: (state, action) => {
      if (!state.brands.includes(action.payload)) {
        state.brands.push(action.payload);
      } else {
        state.brands = state.brands.filter((brand) => brand !== action.payload);
      }
    },
  },
});

export const { toggleBrans, toggleStock } = filterSlice.actions;

export default filterSlice.reducer;
