import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
axios.defaults.withCredentials=true
const baseUrl="http://127.0.0.1:4000/api"

const api=axios.create({
    baseURL:baseUrl,
    // headers: {
    //     'Content-Type': 'multipart/form-data', // Set default content type
    //     // "Content-Type":"application/json"
    //   },
})




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