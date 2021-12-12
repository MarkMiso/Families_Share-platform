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
  let [groups, setGroups] = useState(null);

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
      <div className="max-w-7xl mx-auto px-2 flex justify-center sm:px-6 lg:px-8 ">
        <div className="w-full mt-5 text-center">
          <p className="p-5 text-5xl text-transparent bg-clip-text font-black bg-gradient-to-r from-yellow-500 to-red-500">Your groups</p>
          {groups ? (
            <GroupList groupIDs={groups.map((item) => {return item.group_id})} isMember={true}/>
          ) : (
            <p>
              Eh si ma dammi il tempo
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyFamilyShare;