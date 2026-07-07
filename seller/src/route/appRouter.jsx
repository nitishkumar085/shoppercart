import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import Dashboard from '../pages/dashboard/Dashboard'
import ProtectedRoutes from '../auth/ProtectedRoutes'


const router = createBrowserRouter([{
    path:'/',
    element:<App/>,
    children:[
        {
            index:true,
            element:<Home/>
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"signup",
            element:<Signup/>
        },
        {
            element:<ProtectedRoutes/>,
            children:[
                {
                    path:"dashboard",
                    element:<Dashboard/>

                }
            ]
        }
    ]

}])

export default router