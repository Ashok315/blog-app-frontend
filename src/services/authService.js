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
       const response=await api.post('/users/sign_in',formData)
       return response;
    }
    catch(error){
        throw new Error(error.message)
    }
}

// forgot password
const forgotPassword=async (formData)=>{
    try {
        const response=await api.post('/users/forgotPassword',formData);
        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}

// reset password
const resetPassword=async (token,formData)=>{
   
    try {
        const response=await api.post(`/users/resetPassword/${token}`,formData);
        return response;
    } catch (error) {
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

export default {signUp,signIn,forgotPassword,resetPassword,logout}