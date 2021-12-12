import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useTranslation } from "react-i18next";

const fetchGroup = groupId => {
  return axios
    .get(`/api/groups/${groupId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return {
        image: { path: "" },
        group_id: "",
        name: ""
      };
    });
};

const fetchGroupSettings = groupId => {
  return axios
    .get(`/api/groups/${groupId}/settings`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return {
        open: ""
      };
    });
};

function GroupBlock({ groupId }) {
  let arr = [];
  let tmp = {
    image: { path: "" },
    group_id: "",
    name: ""
  };
  let [group, setGroup] = useState(tmp);
  let [groupSettings, setGroupSettings] = useState(arr);
  let { t } = useTranslation();

  useEffect(() => {
    async function setData() {
      let groupRes = await fetchGroup(groupId);
      let groupSettingsRes = await fetchGroupSettings(groupId);

      console.log(groupRes);
      console.log(groupSettingsRes);
      
      setGroup(groupRes);
      setGroupSettings(groupSettingsRes);
    }

    setData();
  },[groupId]);

  // TODO: loading animation
  return (
    <div className = "flex items-center p-5 shadow-xl rounded-xl font-semibold">
      <div className="rounded-xl w-2/5 sm:w-48 border-2 border-gray-200">
        <img src={group.image.thumbnail_path} alt=""/>
      </div>
      <div className="divide-y-2 pl-5 py-5 text-justify w-3/5 sm:w-full">
        <div className=" pb-2 h-full">
          <p className="text-gray-900 text-xl">{group.name}</p>
          <p className="text-gray-400 text-sm">{group.description}</p>
        </div>
        <div>
          <button className="font-semibold text-white mt-2 grow-0 rounded-md py-1 px-8 bg-gradient-to-r from-yellow-500 to-red-500 w-full sm:w-40">{t('open')}</button>
          <p className="text-gray-400 text-xs mt-2">{groupSettings.open ? t('open group') : t('closed group')}</p>
        </div>
      </div>
    </div>
  )
}

GroupBlock.propTypes = {
  groupId: PropTypes.string
}

export default GroupBlock;