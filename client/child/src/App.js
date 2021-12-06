import React from "react";
import Loadable from "react-loadable";
import LoadingSpinner from "./components/LoadingSpinner";
import axios from "axios";

const Loading = <LoadingSpinner />;

const LandingScreen = Loadable({
  loader: () => import("./components/LandingScreen"),
  loading: () => Loading
});

axios.interceptors.request.use(
  config => {
    let userToken = "";
    const user = localStorage.getItem("user");
    if (user) {
      userToken = JSON.parse(user).token;
    }
    if (userToken) {
      config.headers.Authorization = userToken;
    }

    return config;
  },
  error => Promise.reject(error)
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body className="bg-gray-100 h-screen">
        <LandingScreen />
      </body>
    </div>
  );
}

export default App;
