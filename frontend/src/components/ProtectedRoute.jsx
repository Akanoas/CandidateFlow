import {useContext} from "react";import {Navigate,Outlet} from "react-router-dom";import {AuthContext} from "../context/AuthContext.jsx";
export default function ProtectedRoute(){const {authenticated}=useContext(AuthContext);return authenticated?<Outlet/>:<Navigate to="/login" replace/>;}
