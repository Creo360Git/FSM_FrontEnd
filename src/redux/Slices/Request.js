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
    requests: []
}

const Slice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        // jobsLoaded(state, action) {
        //     const newEntities = []
        //     action.payload.map((job) => {
        //       newEntities.push(job)
        //     })
        //     state.requests = newEntities
        // },
        // createClientSuccess(state, action) {
        //     state.isLoading = false;
        //     state.clients.push(action.payload);
        // },
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

// export const {
//     jobsLoaded
// } = Slice.actions

export default Slice.reducer

// export const fetchJobData = createSelector