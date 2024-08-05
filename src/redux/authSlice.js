import {createSlice} from "@reduxjs/toolkit"

const initialState={
    isAuthenticated:false,
    user:null,
    // refresh:false
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.user=action.payload;
        },
        logout:(state,action)=>{
            state.isAuthenticated=false;
            state.user=null;
        },
        // getRefresh:(state)
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;