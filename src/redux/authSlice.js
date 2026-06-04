//👉 It is creating a small section of your Redux store for authentication-related data. 
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",      //slice name is auth ; where A slice = a small part of your Redux store
    initialState : {
        loading : false,
        user : null
    },
    reducers : {
        setLoading:(state , action) =>{
            state.loading = action.payload
        },
        setUser:(state , action) =>{
            state.user = action.payload
        }

    }
})

export const {setLoading , setUser} = authSlice.actions
export default authSlice.reducer