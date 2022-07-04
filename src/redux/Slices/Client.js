import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchUsers from "src/hooks/useFetch";
import useFetch from "src/hooks/useFetch";
import { dispatch } from "../Store";


export const fetchClients = createAsyncThunk('posts/fetchPosts', async () => {
    return fetch('https://localhost:44367/api/v1/Customer?clientId=1')
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            return res.data
        })
  })

const initialState = {
    isLoading: false,
    error: null,
    clients: [],
    client: null,
    sortBy: null,
    filter: null,
    parameter: null
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
        }
    },
    // reducers: {
    //     startLoading(state) {
    //         state.isLoading = true;
    //     },
    
    //     hasError(state, action) {
    //         state.isLoading = false;
    //         state.error = action.payload;
    //     },
    
    //     getClientsSuccess(state, action) {
    //         state.isLoading = false;
    //         state.clients = action.payload;
    //     },
    
    //     getClientSuccess(state, action) {
    //         state.isLoading = false;
    //         state.client = action.payload;
    //     },
    // }
})

export default Slice.reducer

// export const {
//     getClientsSuccess
// } = Slice.actions


// export const GetClients = () => {
//     return async () => {
//         dispatch(Slice.actions.startLoading())
//         try{
//             const res = fetchClients()
//             console.log(res)
//             dispatch(Slice.actions.getClientsSuccess(res));
//         }
//         catch (error){
//             dispatch(Slice.actions.hasError(error));
//         }
//     }
// }