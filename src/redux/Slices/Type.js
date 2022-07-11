import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dispatch } from "../Store";


export const fetchTypes = createAsyncThunk('types/fetchTypes', async (module) => {
    return fetch(process.env.REACT_APP_API+`/type?clientId=1&module=${module}`)
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.DATA
        })
})

const initialState = {
    isLoading: false,
    error: null,
    types: []
}

const Slice = createSlice({
    name: 'types',
    initialState,
    extraReducers: {
        [fetchTypes.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchTypes.fulfilled]: (state, action) => {
            state.isLoading = false
            state.types = action.payload
        },
        [fetchTypes.rejected]: (state, action) => {
            state.isLoading = false
            state.error= action.payload
        }
    },
})

export default Slice.reducer
