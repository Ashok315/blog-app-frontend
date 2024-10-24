import axios from "axios";
import { logout } from "../redux/authSlice";

axios.defaults.withCredentials=true
const baseUrl=import.meta.env.VITE_API_BASE_URL;

const api=axios.create({
    baseURL:baseUrl
});

export const apiWithoutInterceptor=axios.create({
  baseURL:baseUrl
});


// this is use for the response data or handle errors globally
export const setupInterceptors=(store,loading)=>{
  // add interceptor before api request
   api.interceptors.request.use(
     (config)=>{     
        loading(true);
        return config
    },
    (error)=>{
        loading(false);
        return Promise.reject(error)
    })

  // add interceptor before api response
  api.interceptors.response.use(
    response=>{
        loading(false);
        return response;
    },
    error => {
        if (error.response) {  
            loading(false);
             if(error.response && error.response.status===401){ 
               store.dispatch(logout())
               
               window.location.href = '/sign_in';         
              }
          return Promise.reject(error.response.data);
        }
        loading(false);
        return Promise.reject({message:error.message});
    }
  );

  //add interceptor before api response for apiWithoutInterceptor apis
  apiWithoutInterceptor.interceptors.response.use(
      response=>response,
      error=>{
        if (error.response) {  
            if(error.response && error.response.status===401){ 
              store.dispatch(logout())     
              window.location.href = '/sign_in';         
              }
          return Promise.reject(error.response.data);
        }
        return Promise.reject({message:error.message});
      }
  )
}

export default api;