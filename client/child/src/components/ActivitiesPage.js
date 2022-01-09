import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
      const eventsRes = await fetchEvents(auth.user.id);
      const groupRes = await fetchGroups(auth.user.id);
      const activitiesResList = await Promise.all(groupRes.map(async (group) => {
        return await fetchActivites(group.group_id);
      }))

      let activitiesRes = []
      activitiesResList.forEach((list) => {
        activitiesRes = activitiesRes.concat(list);
      })

      setEvents(eventsRes);
      setActivities(activitiesRes);
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
        <p className="p-8 text-4xl text-transparent bg-clip-text font-black bg-gradient-to-r from-pink-500 to-purple-500">
          {t('your events')}
        </p>
        <List data={events} blockInfo={{type: "event"}}/>
        <Link className="text-center mt-3 shadow-md transition ease-in-out duration-300 w-full py-3 px-8 font-semibold rounded-xl text-white bg-gradient-to-r from-pink-500 to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:shadow-xl" to="/myfamilyshare/activities/new">
          {t('new activity')}
        </Link>
        
        <p className="p-8 text-4xl text-transparent bg-clip-text font-black bg-gradient-to-r from-pink-500 to-purple-500">
          {t('search activities')}
        </p>
        <SearchBar dataInfo={{type: "activity"}} data={activities} />
      </div>
    </div>
  )
}

export default ActivitiesPage;