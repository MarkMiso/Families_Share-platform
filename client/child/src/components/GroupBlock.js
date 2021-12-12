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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function GroupBlock({ groupId, isMember }) {
  let [group, setGroup] = useState(null);
  let [groupSettings, setGroupSettings] = useState(null);
  let { t } = useTranslation();
  let [showFull, setShowFull] = useState(false);

  useEffect(() => {
    async function setData() {
      let groupRes = await fetchGroup(groupId);
      let groupSettingsRes = await fetchGroupSettings(groupId);
      
      setGroup(groupRes);
      setGroupSettings(groupSettingsRes);
    }

    setData();
  },[groupId]);

  isMember = true;

  return (
    <div className = "cursor-pointer bg-white flex  mb-5 mx-5 pt-5 font-semibold"
      onClick={() => {
        if (isMember) {
          //todo: manda alla schermata del gruppo
        } else {
          setShowFull(!showFull);
        }
      }}>
      <div className="overflow-hidden rounded-xl w-2/5 sm:w-40 border-2 border-gray-200">
        {group ? (
          <img src={group.image.thumbnail_path} alt="object-cover"/>
        ) : (
          <div className="h-full w-full bg-gray-200 animate-pulse" />
        )}
      </div>
      <div className="divide-y-2 pl-5 text-justify w-3/5 sm:w-full">
        <div className="pb-2">
          {group ? (
            <p  className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 font-black text-2xl inline-block leading-tight">
              {group.name}
            </p>
          ) : (
            <p className="text-gray-300 text-sm animate-pulse">title</p>
          )}

          {group ? (
            <p className={classNames(
              isMember || showFull ? "" : "truncate", "mt-1 text-gray-400 text-sm"
            )}>{group.description}</p>
          ) : (
            <p className="text-gray-300 text-sm animate-pulse">description</p>
          )}
        </div>

        {isMember ? (
          <></>
        ) : (
          <div>
            {groupSettings ? (
              <div>
                <button className="font-semibold text-white mt-2 rounded-md py-1 px-8 bg-gradient-to-r from-yellow-500 to-red-500 w-full sm:w-40"
                  onClick={() => {
                    // TODO: join button
                  }}>
                  {t('join')}
                </button>
                <p className="font-medium text-gray-400 text-xs mt-2">{groupSettings.open ? t('open group') : t('closed group')}</p>
              </div>
            ) : (
              <div>
                <button className="animate-pulse font-semibold text-white mt-2 rounded-md py-1 px-8 bg-gray-200 w-full sm:w-40">
                  Join Button
                </button>
                <p className="font-medium text-gray-300 text-xs mt-2 animate-pulse">group settings</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

GroupBlock.propTypes = {
  groupId: PropTypes.string,
  isMember: PropTypes.bool
}

export default GroupBlock;