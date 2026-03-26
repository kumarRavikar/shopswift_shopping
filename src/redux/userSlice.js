import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user:null
}
const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        //action
        setUser:(state,action)=>{
            state.user = action.payload
        }
    }
})
export const {setUser} = userSlice.actions;
export const userReducer = userSlice.reducer