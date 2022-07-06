import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { dispatch } from "../Store";


export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
    return fetch(process.env.REACT_APP_API+`/invoice?clientId=1`)
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.DATA
        })
})

export const fetchFilterInvoices = createAsyncThunk('jobs/fetchFilterInvoices', async (url) => {
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
    invoices: [],
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
    name: 'invoices',
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
        [fetchInvoices.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchInvoices.fulfilled]: (state, action) => {
            state.isLoading = false
            state.invoices = action.payload
        },
        [fetchInvoices.rejected]: (state, action) => {
            state.isLoading = false
            state.error= action.payload
        },
        [fetchFilterInvoices.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchFilterInvoices.fulfilled]: (state, action) => {
            state.isLoading = false
            state.invoices = action.payload
        },
        [fetchFilterInvoices.rejected]: (state, action) => {
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