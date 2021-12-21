import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { fetchActivityEvents } from "../services/GroupService"
import { Dialog } from '@headlessui/react';
import List from "./List";
import { LocationMarkerIcon, UserGroupIcon } from '@heroicons/react/outline';

function ActivitiesBlock({ activity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activityEvents, setActivityEvents] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function addData() {
      const activityEventsRes = await fetchActivityEvents(activity.activity_id, activity.group_id);

      setActivityEvents(activityEventsRes);
    }

    if (isOpen) {
      addData();
    }

  },[activity, isOpen])

  return (
    <div>
      <div className="cursor-pointer flex items-center mb-5 mx-5 pt-5 font-semibold" 
        onClick={() =>{
          setIsOpen(true)
      }}>
        <div className={`rounded-md shadow-inner h-12 w-12 bg-activity-${activity.color}`} />
        <div className="pl-5 text-left">
          <p className={`text-xl inline-block font-black text-activity-${activity.color}`}>
            {activity.name}
          </p>
          <div className="text-gray-400 flex items-top">
            <LocationMarkerIcon className="h-4 w-4 mt-1" />
            <p className="ml-1">
              {activity.location}
            </p>
            <UserGroupIcon className="h-4 w-4 mt-1 ml-4" />
            <p className="ml-1">
              {activity.group_name}
            </p>
          </div>
        </div>
      </div>

      <Dialog onClose={() => setIsOpen(false)} open={isOpen} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="relative max-w-sm mx-auto">
              <List data={activityEvents} blockInfo={{type: "event"}}>
                <button className="bg-white p-3 font-semibold text-gray-500 text-lg hover:bg-gray-100  focus:outline-none " onClick={() => setIsOpen(false)}>
                  {t('close')}
                </button>
              </List>
            </div>
        </div>
      </Dialog>
    </div>
  )
}

ActivitiesBlock.propTypes = {
  activity: PropTypes.object
}


export default ActivitiesBlock;