import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = []

const url = "http://localhost:3002/products"

export const getProducts = createAsyncThunk("products/getProducts", async ()=>{
        const res = await axios.get(url)
        return res.data
})

export const SearchSlice = createSlice(
    {
        name:"products",
        initialState,
        extraReducers:{
            [getProducts.fulfilled]:(state, action) => {
                state = action.payload
                return state
            }
        }
    }
)

export const selectProducts = (state) => state.products

export default SearchSlice.reducer