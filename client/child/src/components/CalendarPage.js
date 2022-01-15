import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "./Navbar";
import Calendar from "./Calendar";
import { fetchEvents } from "../services/userService";
import { useAuth } from "./AuthProvider";

const userNav = [
  { name: 'dashboard', href: '/myfamilyshare', current: false },
  { name: 'groups', href: '/myfamilyshare/groups', current: false },
  { name: 'activities', href: '/myfamilyshare/activities', current: false },
  { name: 'calendar', href: '/myfamilyshare/calendar', current: true }
]

function CalendarPage() {
  const { t } = useTranslation();
  let [events, setEvents] = useState(null);
  let auth = useAuth();

  useEffect(() => {
    async function setData() {
      let eventsRes = await fetchEvents(auth.user.id, auth.user.child.child_id);

      setEvents(eventsRes);
    }

    setData();
  },[auth])

  return (
    <div name="CalendarPageContainer">
      <Navbar navigation={userNav}/>
      <div className="max-w-3xl mx-auto px-2 flex flex-col items-center sm:px-6 lg:px-8">
        <p className="p-8 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          {t('your calendar')}
        </p>
        <Calendar eventsList={events}/>
      </div>
    </div>
  )
}

export default CalendarPage;