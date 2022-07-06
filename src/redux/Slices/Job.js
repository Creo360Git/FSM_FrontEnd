import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { dispatch } from "../Store";


export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (url) => {
    return fetch(process.env.REACT_APP_API+`/job?clientId=1`)
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.DATA
        })
})

export const fetchFilterJobs = createAsyncThunk('jobs/fetchFilterJobs', async (url) => {
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
    jobs: [],
    filters: {
        SortBy: '',
        Type: '',
        Parameter: '',
        Due: ''
    }
}

const Slice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        filtersToolBar(state, action) {
            state.filters.SortBy = action.payload.SortBy
            state.filters.Type = action.payload.Type
            state.filters.Parameter = action.payload.Parameter
            state.filters.Due = action.payload.Due
        }
    },
    extraReducers: {
        [fetchJobs.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchJobs.fulfilled]: (state, action) => {
            state.isLoading = false
            state.jobs = action.payload
        },
        [fetchJobs.rejected]: (state, action) => {
            state.isLoading = false
            state.error= action.payload
        },
        [fetchFilterJobs.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchFilterJobs.fulfilled]: (state, action) => {
            state.isLoading = false
            state.jobs = action.payload
        },
        [fetchFilterJobs.rejected]: (state, action) => {
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