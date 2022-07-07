import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../Store";


const initialState = {
    heading: 'Dashboard'
}

const Slice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        changePageHeading(state, action) {
            state.heading = action.payload
        },
    }
})

export default Slice.reducer

export const {
    changePageHeading
} = Slice.actions



