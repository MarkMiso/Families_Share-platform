import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService"

let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let storedUser = JSON.parse(localStorage.getItem("user"));
  let [user, setUser] = React.useState(storedUser);

  let signin = (email, password, callback) => {
    const deviceToken = localStorage.getItem("deviceToken");
    const origin = window.isNative ? "native" : "web";

    return AuthService.signin(email, password, origin, deviceToken, (user) => {
      setUser(user);
      callback();
    });
  };

  let signout = (callback) => {
    return () => {
      localStorage.removeItem("user")
      setUser(null);
      callback();
    }
  };

  let value = {user, signin, signout};

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }) {
  let auth = useAuth();
  
  if (!auth.user) {
    return (
      <Navigate to="/login" />
    );
  }

  return children;
}

RequireAuth.propTypes = {
  children: React.ReactNode
}

AuthProvider.propTypes = {
  children: React.ReactNode
}

export { AuthProvider, RequireAuth, useAuth };