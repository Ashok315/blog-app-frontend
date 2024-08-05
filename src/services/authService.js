import api from "./api";

const signUp=async (formData)=>{
   
    try{
        const response=await api.post('/users/sign_up',formData);
        return response;   
    }
    catch(error){
        throw new Error(error.message)
    
    }
}

const signIn=async (formData)=>{
    try{
       const response=await api.post('/users/sign_in',formData)
       return response;
    }
    catch(error){
        throw new Error(error.message)
    }
}

const logout=async ()=>{
    try{
       const response=await api.post('/users/logout');
       return response;
    }
    catch(error){
        throw new Error(error.message)
    }
}

const getCurrentUser=async ()=>{
    try {
        const response=await api.get('/users/getCurrentUser')
        return response;
    } catch (error) {
        throw new Error({'error':error.message})
    }
}

const updateProfile=async(userId,formData)=>{
    try{
        const response=await api.patch(`/users/updateProfile/${userId}`,formData)
        return response;
    }
    catch(error){
        throw new Error({'error':error.message})
    }

}

const updateProfileImage=async (userId,file,progressStatus)=>{
    try{
       const response=await api.patch(`/users/updateProfileImage/${userId}`,file,{
        onUploadProgress:(data)=>{
             progressStatus(Math.round((data.loaded*100)/data.total))
        }
       })
       return response;
    }
    catch(error){
        throw new Error({'error':error.message})
    }
}

export default {signUp,signIn,logout,getCurrentUser,updateProfile,updateProfileImage}