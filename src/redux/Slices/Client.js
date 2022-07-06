import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dispatch } from "../Store";


export const fetchClients = createAsyncThunk('clients/fetchClients', async (url) => {
    return fetch(process.env.REACT_APP_API+url+'?clientId=1')
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.DATA
        })
})

export const fetchFilterClients = createAsyncThunk('jobs/fetchFilterClients', async (url) => {
    return fetch(url)
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.DATA
        })
})

export const GetClient = createAsyncThunk('client/fetchClient', async (id) => {
    return fetch(process.env.REACT_APP_API+`/customer/id?clientId=1&customerId=${id}`)
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.DATA
        })
})

export const CreateClient = createAsyncThunk('client/createClient', async (body) => {
    return fetch(process.env.REACT_APP_API+`/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
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
    clients: [],
    client: null,
    filters: {
        SortBy: '',
        Filter: '',
        Parameter: ''
    }
}

const Slice = createSlice({
    name: 'clients',
    initialState,
    extraReducers: {
        [fetchClients.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchClients.fulfilled]: (state, action) => {
            state.isLoading = false
            state.clients = action.payload
        },
        [fetchClients.rejected]: (state, action) => {
            state.isLoading = false
            state.error= action.payload
        },
        [GetClient.fulfilled]: (state, action) => {
            state.isLoading = false
            state.client = action.payload
        },
        [CreateClient.fulfilled]: (state, action) => {
            state.isLoading = false
            state.clients = state.clients.push(action.payload)
        },
        [fetchFilterClients.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchFilterClients.fulfilled]: (state, action) => {
            state.isLoading = false
            state.clients = action.payload
        },
        [fetchFilterClients.rejected]: (state, action) => {
            state.isLoading = false
            state.error= action.payload
        }
    },
    reducers: {
        // startLoading(state) {
        //     state.isLoading = true;
        // },
    
        // hasError(state, action) {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
    
        // getClientsSuccess(state, action) {
        //     state.isLoading = false;
        //     state.clients = action.payload;
        // },
    
        createClientSuccess(state, action) {
            state.isLoading = false;
            state.clients.push(action.payload);
        },
        filtersToolBar(state, action) {
            state.filters.SortBy = action.payload.SortBy
            state.filters.Filter = action.payload.Filter
            state.filters.Parameter = action.payload.Parameter
        }
    }
})

export default Slice.reducer

export const {
    createClientSuccess,
    filtersToolBar
} = Slice.actions


