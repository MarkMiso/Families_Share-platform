import React from "react";
import { useAuth } from "./AuthProvider";
import Navbar from "./Navbar";

function MyFamilyShare() {
  let auth = useAuth();

  return (
    <div className="MyFamilyShareContainer">
      <Navbar />
      <div>
        { auth.user }
      </div>
    </div>
  )
}

export default MyFamilyShare;