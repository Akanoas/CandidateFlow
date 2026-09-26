import {createContext,useState} from "react";
import auth from "../services/auth.service";
export const AuthContext=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(auth.authenticated()?auth.current():null);const login=async(values)=>{const data=await auth.login(values);setUser(auth.current());return data;};const logout=()=>{auth.logout();setUser(null);};return <AuthContext.Provider value={{user,authenticated:Boolean(user),login,logout}}>{children}</AuthContext.Provider>;}
