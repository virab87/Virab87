import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = []

const url = "http://localhost:3002/categories"

export const getCategories = createAsyncThunk("category/getCategories", async () => {
    const res = await axios.get(url)
    return res.data
})

export const addCategory = createAsyncThunk("category/addCategory", async ({ text, genderQuery , images}) => {
    const res = await axios.post(url, {
        title: text,
        gender: genderQuery,
        image:`/img/${images[0].file.name}`
    })
    return res.data
})

export const CategoriesSlice = createSlice(
    {
        name: "category",
        initialState,
        extraReducers: {
            [getCategories.fulfilled]: (state, action) => {
                state = action.payload
                return state
            },
            [addCategory.fulfilled]: (state, action) => {
                state.push(action.payload)
                return state
            }
        }
    }
)


export const selectCategories = (state) => state.categories

export default CategoriesSlice.reducer