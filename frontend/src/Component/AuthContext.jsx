// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const getUser= localStorage.getItem("user");
//     if(getUser){
//       setUser(JSON.parse(getUser));
//     }
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token); // Convert to boolean
//   }, []);

//   const login = (userData,token) => {
//     localStorage.setItem("user",JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setIsLoggedIn(true); // Update state immediately
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
