import {Navigate, Outlet} from "react-router-dom"
import { SellerContext } from "../authMiddleware/AuthUser"
import { useContext } from "react"


export default function ProtectedRoutes(){


   
const token  = localStorage.getItem("token")

return token? <Outlet/> : <Navigate to="/login" replace/>
}