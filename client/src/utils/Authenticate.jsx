import { createContext, useEffect, useState } from 'react';

export const LoginContext = createContext();

function Authenticate({ children }) {
  // Read token from localStorage when app starts
  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem('token');
  });



  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
}

export default Authenticate;