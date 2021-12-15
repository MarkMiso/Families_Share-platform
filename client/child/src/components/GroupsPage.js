import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fetchGroups } from "../services/userService";
import { fetchGroupsAll } from "../services/GroupService";

import { useAuth } from "./AuthProvider";
import Navbar from "./Navbar";
import List from "./List";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";


const userNav = [
  { name: 'dashboard', href: '/myfamilyshare', current: false },
  { name: 'groups', href: '/myfamilyshare/groups', current: true },
  { name: 'activities', href: '/myfamilyshare/activities', current: false },
  { name: 'calendar', href: '/myfamilyshare/calendar', current: false }
]

function GroupsPage() {
  let auth = useAuth();
  let [groups, setGroups] = useState(null);
  let [search, setSearch] = useState(null);
  let { t } = useTranslation();

  useEffect(() => {
    async function setData() {
      let groupRes = await fetchGroups(auth.user.id);
      let searchRes = await fetchGroupsAll();

      setSearch(searchRes);
      setGroups(groupRes);
    }

    setData();
  },[auth.user.id]);

  return(
    <div name="GroupsPageContainer">
      <Navbar navigation={userNav}/>
      <div className="max-w-3xl mx-auto px-2 flex justify-center sm:px-6 lg:px-8">
        <div className="w-full text-center">
          <div name="ListContainer">
            <p className="p-8 text-4xl text-transparent bg-clip-text font-black bg-gradient-to-r from-yellow-500 to-red-500">
              {t('your groups')}
            </p>
            {groups ? (
              <List data={groups} blockInfo={{type: "group", isMember: true}}/>
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div name="GroupSearchContainer">
            <p className="p-8 text-4xl text-transparent bg-clip-text font-black bg-gradient-to-r from-yellow-500 to-red-500">
              {t('search groups')}
            </p>
            {search ? (
              <SearchBar dataInfo={{type: "group", isMember: false}} data={search} />
            ) : (
              <LoadingSpinner />
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupsPage;