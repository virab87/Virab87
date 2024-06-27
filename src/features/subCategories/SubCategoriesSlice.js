import { Category } from "@mui/icons-material"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = []


const url = "http://localhost:3002/subcategories"

export const getSubCategories = createAsyncThunk("subCategory/getSubCategories", async () => {
    const res = await axios.get(url)
    return res.data
})

export const addSubCategory = createAsyncThunk("subCategory/addSubCategory", async ({ text, categoryQuery }) => {
    const res = await axios.post(url, {
        title: text,
        category: categoryQuery
    })
})

export const SubCategoriesSlice = createSlice(
    {
        name: "subCategory",
        initialState,
        extraReducers: {
            [getSubCategories.fulfilled]: (state, action) => {
                state = action.payload
                return state
            },
            // [addSubCategory.fulfilled]: (state, action) => {
            //     state.push(action.payload)
            //     return state
            // }
        }
    }
)


export const selectSubCategories = (state) => state.subCategories

export default SubCategoriesSlice.reducer