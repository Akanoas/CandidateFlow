import axios from "axios";
const api=axios.create({baseURL:"http://localhost:8080/api",headers:{"Content-Type":"application/json"},timeout:10000});
export const clearSession=()=>["token","userId","userEmail","userRole"].forEach((key)=>localStorage.removeItem(key));
api.interceptors.request.use((config)=>{const token=localStorage.getItem("token");if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
api.interceptors.response.use((response)=>response,(error)=>{if(error.response?.status===401){clearSession();if(!["/login","/register"].includes(window.location.pathname))window.location.assign("/login?expired=true");}return Promise.reject(error);});
export const errorMessage=(error)=>{const data=error.response?.data;if(typeof data==="string")return data;if(data?.message)return data.message;if(data?.error)return data.error;if(error.response?.status===403)return "You do not have permission to perform that action.";if(error.request)return "The backend did not respond. Verify Spring Boot is running on port 8080.";return error.message||"An unexpected error occurred.";};
export default api;
