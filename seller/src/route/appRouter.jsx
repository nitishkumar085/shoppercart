import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import Dashboard from '../pages/dashboard/Dashboard'
import ProtectedRoutes from '../auth/ProtectedRoutes'
import Inventory from '../pages/inventory/Inventory'
import Orders from '../pages/orders/Orders'
import Marketing from '../pages/marketing/Marketing'
import Analytics from '../pages/analytics/Analytics'
import Payments from '../pages/payments/Payments'
import Settings from '../pages/settings/Settings'
import Customers from '../pages/customers/Customers'
import DashboardHome from '../pages/dashboardHome/DashboardHome'


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
                    element:<Dashboard/>,
                    children:[
                        {
                            index:true,
                            element:<DashboardHome/>
                        },
                        {
                            path:"inventory",
                            element:<Inventory/>
                        },
                        {
                            path:"order",
                            element:<Orders/>
                        },
                        {
                            path:"customers",
                            element:<Customers/>
                        },
                        {
                            path:"marketing",
                            element:<Marketing/>
                        },
                        {
                            path:"analytics",
                            element:<Analytics/>
                        },{
                            path:"payment",
                            element:<Payments/>
                        },
                        {
                            path:"settings",
                            element:<Settings/>
                        }
                    ]


                }
            ]
        }
    ]

}])

export default router