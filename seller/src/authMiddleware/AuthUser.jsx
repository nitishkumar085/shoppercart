import { createContext, useState,useEffect } from "react";

export const SellerContext = createContext()

export default function AuthUser({children}){
   // Read token from localStorage when app starts
     const [isLogin, setIsLogin] = useState(() => {
       return !!localStorage.getItem('token');
     });
    

    return(
        <SellerContext.Provider value={{isLogin,setIsLogin}}>
            {children}
        </SellerContext.Provider>
    )

}