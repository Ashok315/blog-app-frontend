import axios from "axios";
import { logout } from "../redux/authSlice";

axios.defaults.withCredentials=true
const baseUrl=import.meta.env.VITE_API_BASE_URL;

const api=axios.create({
    baseURL:baseUrl
})

// this is use for the response data or handle errors globally
export const setupInterceptors=(store)=>{
  api.interceptors.response.use(
    response => response,
    error => {
      // Handle error
        if (error.response) {  
          // Request made and server responded
             if(error.response && error.response.status===401){
               store.dispatch(logout())
               window.location.href = '/sign_in';         
              }
          return Promise.reject(error.response.data);
        }
  
        return Promise.reject({message:error.message});
      // }
    }
  );
}


export default api;