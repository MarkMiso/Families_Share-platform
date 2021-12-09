import React from "react";
import { Navigate } from "react-router-dom";

let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    // TODO: actual login
    return () => {
      setUser(newUser);
      callback();
    }
  }

  let signout = (callback) => {
    return () => {
      setUser(null);
      callback();
    }
  }

  let value = {user, signin, signout};

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
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