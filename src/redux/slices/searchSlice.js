import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

const searchSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, {payload}) => {
            state.value = payload
        }
    }
})

export const {setSearch} = searchSlice.actions


export default searchSlice.reducer