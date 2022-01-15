import axios from "axios";

function signin(email, password, child, origin, deviceToken, callback) {
  const language = "it"; // TODO: read from local storage
  const data = {
    email,
    password,
    username: child,
    deviceToken,
    language,
    origin
  };

  // NOTE: probably useless
  if (origin === "native") {
    data.version = localStorage.getItem("version");
  }

  return axios({
    url: "/api/users/authenticate/email",
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data)

  }).then(response => {
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    callback(user);

  }).catch(error => Promise.reject(error));
}

function signout(callback) {
  localStorage.removeItem("user");
  callback();
}

const AuthService = {
  signin,
  signout
};

export default AuthService;