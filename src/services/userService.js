import api from './api'

// get current user
const getCurrentUser=async ()=>{
    try {
        const response=await api.get('/users/getCurrentUser')
        return response;
    } catch (error) {
        throw new Error({'error':error.message})
    }
}

// update profile data 
const updateProfile=async(userId,formData)=>{
    try{
        const response=await api.patch(`/users/updateProfile/${userId}`,formData)
        return response;
    }
    catch(error){
        throw new Error({'error':error.message})
    }

}

// update profile image
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

export default {getCurrentUser,updateProfile,updateProfileImage}