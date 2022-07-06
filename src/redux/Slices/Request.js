import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { dispatch } from "../Store";


export const fetchRequests = createAsyncThunk('requests/fetchRequests', async () => {
    return fetch(process.env.REACT_APP_API+`/request?clientId=1`)
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.DATA
        })
})

export const fetchFilterRequests = createAsyncThunk('requests/fetchFilterRequests', async (url) => {
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
    requests: [],
    filters: {
        SortBy: '',
        Filter: '',
        Parameter: ''
    }
}

const Slice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        filtersToolBar(state, action) {
            state.filters.SortBy = action.payload.SortBy
            state.filters.Filter = action.payload.Filter
            state.filters.Parameter = action.payload.Parameter
        }
    },
    extraReducers: {
        [fetchRequests.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchRequests.fulfilled]: (state, action) => {
            state.isLoading = false
            state.requests = action.payload
        },
        [fetchRequests.rejected]: (state, action) => {
            state.isLoading = false
            state.error= action.payload
        },
        [fetchFilterRequests.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchFilterRequests.fulfilled]: (state, action) => {
            state.isLoading = false
            state.requests = action.payload
        },
        [fetchFilterRequests.rejected]: (state, action) => {
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