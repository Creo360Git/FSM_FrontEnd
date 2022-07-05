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
    jobs: []
}

const Slice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        // jobsLoaded(state, action) {
        //     const newEntities = []
        //     action.payload.map((job) => {
        //       newEntities.push(job)
        //     })
        //     state.jobs = newEntities
        // },
        // createClientSuccess(state, action) {
        //     state.isLoading = false;
        //     state.clients.push(action.payload);
        // },
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

// export const {
//     jobsLoaded
// } = Slice.actions

export default Slice.reducer

// export const fetchJobData = createSelector