import api,{clearSession} from "../api/api";
const save=(data)=>{if(!data?.token)throw new Error("Login response did not contain token.");localStorage.setItem("token",data.token);localStorage.setItem("userId",String(data.id??""));localStorage.setItem("userEmail",data.email??"");localStorage.setItem("userRole",data.role??"");};
const auth={register:(payload)=>api.post("/auth/register",payload).then(r=>r.data),login:async(payload)=>{const data=(await api.post("/auth/login",payload)).data;save(data);return data;},logout:clearSession,current:()=>({id:localStorage.getItem("userId"),email:localStorage.getItem("userEmail"),role:localStorage.getItem("userRole")}),authenticated:()=>Boolean(localStorage.getItem("token"))};
export default auth;
