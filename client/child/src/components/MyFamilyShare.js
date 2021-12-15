import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import Navbar from "./Navbar";
import axios from "axios";
import List from "./List";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "./LoadingSpinner";

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

const fetchEvents = userId => {
  return axios
    .get(`/api/users/${userId}/events`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

const userNav = [
  { name: 'dashboard', href: '/myfamilyshare', current: true },
  { name: 'groups', href: '/myfamilyshare/groups', current: false },
  { name: 'activities', href: '/myfamilyshare/activities', current: false },
  { name: 'calendar', href: '/myfamilyshare/calendar', current: false }
]

function MyFamilyShare() {
  let auth = useAuth();
  let [groups, setGroups] = useState(null);
  let [events, setEvents] = useState(null);
  let { t } = useTranslation();

  useEffect(() => {
    async function setData() {
      let groupRes = await fetchGroups(auth.user.id);
      let eventsRes = await fetchEvents(auth.user.id);

      setGroups(groupRes);
      setEvents(eventsRes);
    }

    setData();
  },[auth.user.id]);

  // TODO: loading animation
  return (
    <div className="MyFamilyShareContainer">
      <Navbar navigation={userNav}/>
      <div className="max-w-3xl mx-auto px-2 flex justify-center sm:px-6 lg:px-8 ">
        <div className="w-full text-center">
          <div className="ListContainer">
            <p className="p-8 text-4xl text-transparent bg-clip-text font-black bg-gradient-to-r from-yellow-500 to-red-500">
              {t('your groups')}
            </p>
            {groups ? (
              <List data={groups} blockInfo={{type: "group", isMember: true}}/>
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div className="ActivitiesListContainer">
            <p className="p-8 text-4xl text-transparent bg-clip-text font-black bg-gradient-to-r from-red-500 to-pink-500">
              {t('your events')}
            </p>
            {events ? (
              <List data={events} blockInfo={{type: "event"}}/>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyFamilyShare;
export { fetchGroups, fetchEvents};