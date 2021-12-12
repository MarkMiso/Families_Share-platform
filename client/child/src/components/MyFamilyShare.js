import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import Navbar from "./Navbar";
import axios from "axios";
import GroupList from "./GroupList";

const fetchGroups = (userId) => {
  return axios
    .get(`/api/users/${userId}/groups`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

function MyFamilyShare() {
  let auth = useAuth();
  let arr = [];
  let [groups, setGroups] = useState(arr);

  useEffect(() => {
    async function setData() {
      let res = await fetchGroups(auth.user.id);
      setGroups(res);
    }

    setData();
  },[auth.user.id]);

  return (
    <div className="MyFamilyShareContainer">
      <Navbar />
      <div className="max-w-7xl mx-auto h-96 px-2 flex justify-center sm:px-6 lg:px-8">
        {groups.length > 0 ? (<GroupList groupIDs={groups.map((item) => {return item.group_id})}/>) : (<></>)}
      </div>
    </div>
  )
}

export default MyFamilyShare;