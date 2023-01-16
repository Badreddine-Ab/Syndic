import { createContext, useState,useEffect } from "react";
import Cookie from "js-cookie";

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    let [auth, setAuth] = useState({});
    console.log('authProvider run');

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;