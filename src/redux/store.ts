import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import searchSlice from "./slices/searchSlice";
import cartSlice from "./slices/cartSlice";
import dataSlice from "./slices/dataSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    search: searchSlice,
    cart: cartSlice,
    data: dataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
