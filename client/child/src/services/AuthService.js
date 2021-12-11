import axios from "axios";

const AuthService = {
  signin(email, password, origin, deviceToken, callback) {
    const language = "it"; // TODO: read from local storage
    const data = {
      email,
      password,
      deviceToken,
      language,
      origin
    };

    // NOTE: probably useless
    if (origin === "native") {
      data.version = localStorage.getItem("version");
    }

    axios({
      url: "/api/users/authenticate/email",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data)
    }).then(response => {
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      callback(user);
    }).catch(error => Promise.reject(error));
  }
}

export default AuthService;