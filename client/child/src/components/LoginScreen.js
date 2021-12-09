import React from "react";
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom";

export function LoginScreen() {
  let auth = useAuth();
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");

    console.log(auth.user)

    auth.signin(username, () => { 
      navigate('/myfamilyshare')
    })();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username: <input name="username" type="text" />
      </label>{" "}
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginScreen;