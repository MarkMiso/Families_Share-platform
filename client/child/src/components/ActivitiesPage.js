import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fetchEvents, fetchGroups } from "../services/userService";
import { fetchActivites } from "../services/GroupService";

import { useAuth } from "./AuthProvider";
import Navbar from "./Navbar";
import List from "./List";
import SearchBar from "./SearchBar";


const userNav = [
  { name: 'dashboard', href: '/myfamilyshare', current: false },
  { name: 'groups', href: '/myfamilyshare/groups', current: false },
  { name: 'activities', href: '/myfamilyshare/activities', current: true },
  { name: 'calendar', href: '/myfamilyshare/calendar', current: false }
]

function ActivitiesPage() {
  let auth = useAuth();
  let [events, setEvents] = useState(null);
  let [activities, setActivities] = useState(null);
  let [groups, setGroups] = useState(null);
  let { t } = useTranslation();

  useEffect(() => {
    async function setData() {
      let eventsRes = await fetchEvents(auth.user.id);
      let groupRes = await fetchGroups(auth.user.id);

      setEvents(eventsRes);
      setGroups(groupRes);
    }

    setData();
  },[auth.user.id]);

  // TODO: actual loop
  useEffect(() => {
    if (groups) {
      groups.forEach((group) => {
        async function addData() {
          let activitiesRes = await fetchActivites(group.group_id);

          setActivities(activitiesRes)
        }

        addData();
      })
    }
  },[groups])

  return(
    <div name="GroupsPageContainer">
      <Navbar navigation={userNav}/>
      <div className="max-w-3xl mx-auto px-2 flex flex-col items-center sm:px-6 lg:px-8">
        <p className="p-8 text-4xl text-transparent bg-clip-text font-black bg-gradient-to-r from-red-500 to-pink-500">
          {t('your events')}
        </p>
        <List data={events} blockInfo={{type: "event"}}/>
        
        <p className="p-8 text-4xl text-transparent bg-clip-text font-black bg-gradient-to-r from-red-500 to-pink-500">
          {t('search activities')}
        </p>
        <SearchBar dataInfo={{type: "activity"}} data={activities} />
      </div>
    </div>
  )
}

export default ActivitiesPage;