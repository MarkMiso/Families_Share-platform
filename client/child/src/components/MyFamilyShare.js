import React from "react";
import { useAuth } from "./AuthProvider";

function MyFamilyShare() {
  let auth = useAuth();

  return(
    <p>{ auth.user }</p>
  )
}

export default MyFamilyShare;