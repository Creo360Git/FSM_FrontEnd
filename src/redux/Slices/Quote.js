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
    quotes: []
}

const Slice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        // jobsLoaded(state, action) {
        //     const newEntities = []
        //     action.payload.map((job) => {
        //       newEntities.push(job)
        //     })
        //     state.quotes = newEntities
        // },
        // createClientSuccess(state, action) {
        //     state.isLoading = false;
        //     state.clients.push(action.payload);
        // },
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

// export const {
//     jobsLoaded
// } = Slice.actions

export default Slice.reducer

// export const fetchJobData = createSelector