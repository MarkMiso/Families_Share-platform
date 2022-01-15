import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LocationMarkerIcon, DocumentTextIcon } from '@heroicons/react/outline';
import { Dialog } from '@headlessui/react';
import List from "./List";
import { fetchGroup, fetchGroupSettings } from "../services/GroupService";

function GroupBlock({ groupId, isMember }) {
  let [group, setGroup] = useState(null);
  let [groupSettings, setGroupSettings] = useState(null);
  let { t } = useTranslation();
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  useEffect(() => {
    async function setData() {
      const groupSettingsRes = await fetchGroupSettings(groupId);
      setGroupSettings(groupSettingsRes);

      const groupRes = await fetchGroup(groupId);
      setGroup(groupRes);
    }

    setData();
  },[groupId]);

  if (group) {
    return (
      <div className = "bg-white mb-5 mx-5 pt-5">
        <div className = "cursor-pointer flex font-semibold"
        onClick={() => {
            setShowGroupInfo(true);
        }}>
          <div className="overflow-hidden rounded-xl w-2/5 sm:w-40 border-2 border-gray-200 shadow-inner">
            <img src={group.image.thumbnail_path} alt="object-cover"/>
          </div>
          <div className="pl-5 text-justify w-3/5 sm:w-full">
            <p  className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 font-black text-2xl inline-block leading-tight">
              {group.name}
            </p>
            <div className="mt-1 text-gray-400 flex items-top">
              <LocationMarkerIcon className="h-4 w-4 mt-1" />
              <p className="ml-1">
                {group.location}
              </p>
            </div>
            <div className="mt-1 overflow-ellipsis overflow-hidden text-gray-400 flex items-top">
              <DocumentTextIcon className="h-4 w-4 mt-1" />
              <p className="ml-1 text-left">
                {group.description}
              </p>
            </div>
          </div>
        </div>

        <Dialog onClose={() => setShowGroupInfo(false)} open={showGroupInfo} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              <div className="relative max-w-sm mx-auto">
                <List data={[{group_id: groupId, isMember:isMember}]} blockInfo={{type: "group"}}>
                  <div className="items-center mb-5 mx-5 pt-3">
                    <p className="text-center font-medium text-gray-400 text-xs mt-2">{groupSettings.open ? t('open group') : t('closed group')}</p>
                  </div>
                  <button className="bg-white p-3 font-semibold text-gray-500 text-lg hover:bg-gray-100  focus:outline-none" onClick={() => setShowGroupInfo(false)}>
                    {t('close')}
                  </button>
                </List>
              </div>
          </div>
        </Dialog>
      </div>
    )
  }

  return (
    <div className = "bg-white flex mb-5 mx-5 pt-5 font-semibold"> 
      <div className="overflow-hidden rounded-xl h-32 w-2/5 sm:w-40 bg-gray-200 animate-pulse" />
      <div className="pl-5 text-justify w-3/5 sm:w-full">
        <div className="bg-gray-200 animate-pulse h-6 rounded-md"/>
        <div className="mt-2 bg-gray-200 animate-pulse h-24 rounded-md"/>
      </div>
    </div>
  )
}

GroupBlock.propTypes = {
  groupId: PropTypes.string,
  isMember: PropTypes.bool
}

export default GroupBlock;