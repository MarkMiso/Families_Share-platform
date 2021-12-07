import React from "react";
import Loadable from "react-loadable";
import { Routes, Route } from "react-router-dom";
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
      <body className="h-screen">
        <Routes>
          <Route exact path="/" element={<LandingScreen />} />
        </Routes>
      </body>
    </div>
  );
}

export default App;
