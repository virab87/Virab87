import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import categoriesReducer from "../features/categories/CategoriesSlice"
import ProductsSlice from '../features/products/ProductsSlice';
import SubCategoriesReducer from '../features/subCategories/SubCategoriesSlice';
import ProductsReducer from "../features/products/ProductsSlice"
import SearchReducer from "../features/search/SearchSlice"

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    subCategories: SubCategoriesReducer,
    products: ProductsReducer,
    search: SearchReducer,
  },
  middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(), logger]
});
