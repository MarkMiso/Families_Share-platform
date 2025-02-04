import React from "react";
import Loadable from "react-loadable";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { AuthProvider, RequireAuth } from "./components/AuthProvider";
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:4000';

const Loading = <LoadingSpinner />;

const LandingScreen = Loadable({
  loader: () => import("./components/LandingScreen"),
  loading: () => Loading
});

const LoginScreen = Loadable({
  loader: () => import("./components/LoginScreen"),
  loading: () => Loading
})

const MyFamilyShare = Loadable({
  loader: () => import("./components/MyFamilyShare"),
  loading: () => Loading
})

const GroupsPage = Loadable({
  loader: () => import("./components/GroupsPage"),
  loading: () => Loading
})

const ActivitiesPage = Loadable({
  loader: () => import("./components/ActivitiesPage"),
  loading: () => Loading
})

const CalendarPage = Loadable({
  loader: () => import("./components/CalendarPage"),
  loading: () => Loading
})

const NewActivityPage = Loadable({
  loader: () => import("./components/NewActivityPage"),
  loading: () => Loading
})

const FAQ = Loadable({
  loader: () => import("./components/FAQPage"),
  loading: () => Loading
})

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
      <AuthProvider>
        <body className="h-screen bg-gray-100">
          <Routes>
            <Route exact path="/" element={<LandingScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/myfamilyshare" element={<RequireAuth> <MyFamilyShare /> </RequireAuth>} />
            <Route path="/myfamilyshare/groups" element={<RequireAuth> <GroupsPage /> </RequireAuth>} />
            <Route path="/myfamilyshare/activities" element={<RequireAuth> <ActivitiesPage /> </RequireAuth>} />
            <Route path="/myfamilyshare/activities/new" element={<RequireAuth> <NewActivityPage /> </RequireAuth>} />
            <Route path="/myfamilyshare/calendar" element={<RequireAuth> <CalendarPage /> </RequireAuth>} />
            <Route path="/myfamilyshare/faq" element={<RequireAuth> <FAQ/> </RequireAuth>} />         
          </Routes>
        </body>
      </AuthProvider>
    </div>
  );
}

export default App;