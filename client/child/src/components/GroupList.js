import React from "react";
import PropTypes from "prop-types";
import GroupBlock from "./GroupBlock";
import { useTranslation } from "react-i18next";

function GroupList({ groupIDs, isMember}) {
  let { t } = useTranslation();
  return (
    <div className="mt-5 bg-white rounded-xl grid grid-cols-1 divide-y-2 divide-gray-200 shadow-md overflow-hidden">
      {groupIDs.length > 0 ? (groupIDs.map((item) => (<GroupBlock groupId={item} isMember={isMember}/>))) : (
        <p className="p-5 font-semibold text-gray-400">
          {t('no results')}
        </p>
      )}
    </div>
  )
}

GroupList.propTypes = {
  groupIDs: PropTypes.array,
  isMember: PropTypes.bool
}

export default GroupList;