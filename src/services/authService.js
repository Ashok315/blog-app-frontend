import api from "./api";

// signUp 
const signUp=async (formData)=>{
   
    try{
        const response=await api.post('/users/sign_up',formData);
        return response;   
    }
    catch(error){
        throw new Error(error.message)
    
    }
}

// signIn 
const signIn=async (formData)=>{
    try{
       const response=await api.post('/users/sign_in',formData,{showLoading:false})
       return response;
    }
    catch(error){
        throw new Error(error.message)
    }
}

// logout 
const logout=async ()=>{
    try{
       const response=await api.post('/users/logout');
       return response;
    }
    catch(error){
        throw new Error(error.message)
    }
}

export default {signUp,signIn,logout}