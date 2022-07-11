import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { dispatch } from "../Store";


export const fetchQuotes = createAsyncThunk('quotes/fetchQuotes', async () => {
    return fetch(process.env.REACT_APP_API+`/quote?clientId=1`)
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.DATA
        })
})

export const fetchFilterQuotes = createAsyncThunk('quotes/fetchFilterQuotes', async (url) => {
    return fetch(url)
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
    quotes: [],
    filters: {
        SortBy: '',
        Filter: '',
        Parameter: '',
        Due: '',
        Start: '',
        End: ''
    }
}

const Slice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        filtersToolBar(state, action) {
            state.filters.SortBy = action.payload.SortBy
            state.filters.Filter = action.payload.Filter
            state.filters.Parameter = action.payload.Parameter
            state.filters.Due = action.payload.Due
            state.filters.End = action.payload.End
            state.filters.Start = action.payload.Start
        }
    },
    extraReducers: {
        [fetchQuotes.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchQuotes.fulfilled]: (state, action) => {
            state.isLoading = false
            state.quotes = action.payload
        },
        [fetchQuotes.rejected]: (state, action) => {
            state.isLoading = false
            state.error= action.payload
        },
        [fetchFilterQuotes.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchFilterQuotes.fulfilled]: (state, action) => {
            state.isLoading = false
            state.quotes = action.payload
        },
        [fetchFilterQuotes.rejected]: (state, action) => {
            state.isLoading = false
            state.error= action.payload
        }
    },
})

export const {
    filtersToolBar
} = Slice.actions

export default Slice.reducer

// export const fetchJobData = createSelector