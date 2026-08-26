import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/appRouter.jsx'
import AuthUser from './authMiddleware/AuthUser.jsx'

createRoot(document.getElementById('root')).render(
  
   <AuthUser>
    <RouterProvider router={router}/>
   </AuthUser>

)
