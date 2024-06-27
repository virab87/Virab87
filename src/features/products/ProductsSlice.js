import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = []

const url = "http://localhost:3002/products"

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const res = await axios.get(url)
    return res.data
})

export const addProducts = createAsyncThunk("products/addProducts", async ({price,code,images,subCategoryQuery}) => {
    const res = await axios.post(url, {
        price: price,
        code: code,
        image:`/img/${images[0].file.name}`,
        subCategory: subCategoryQuery
    })
    return res.data
})

export const ProductsSlice = createSlice(
    {
        name: "products",
        initialState,
        extraReducers: {
            [getProducts.fulfilled]: (state, action) => {
                state = action.payload
                return state
            },
            [addProducts.fulfilled]: (state, action) => {
                state.push(action.payload)
                return state
            }
        }
    }
)

export const selectProducts = (state) => state.products

export default ProductsSlice.reducer