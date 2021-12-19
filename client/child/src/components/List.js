import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import GroupBlock from "./GroupBlock";
import EventBlock from "./EventBlock";
import ActivitiesBlock from "./ActivitiesBlock";
import LoadingSpinner from "./LoadingSpinner";

function Block( {item, blockInfo} ) {
  if (blockInfo.type === "group") {
    return (
      <GroupBlock groupId={item.group_id} isMember={item.isMember}/>
    )
  }

  if (blockInfo.type === "event") {
    return (
      <EventBlock event={item}/>
    )
  }

  if (blockInfo.type === "activity") {
    return (
      <ActivitiesBlock activity={item}/>
    )
  }

  return (
    <></>
  )
}

function List({ children, data, blockInfo }) {
  let { t } = useTranslation();

  function listWrapper(actualList) {
    return (
      <div name="listContainer" className="w-full">
        <div className="bg-white rounded-xl grid grid-cols-1 divide-y-2 divide-gray-200 shadow-md overflow-hidden">
          {actualList}
          {children}
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      listWrapper( 
        <div className="p-3">
          <LoadingSpinner />
        </div>
      )
    )
  }

  if (data.length <= 0) {
    return(
      listWrapper(
        <p className="p-5 font-semibold text-gray-400">
          {t('no results')}
        </p>
      )
    )
  }

  return (
    listWrapper(data.map((item) => (<Block item={item} blockInfo={blockInfo}/>)))
  )
}

List.propTypes = {
  data: PropTypes.array,
  blockInfo: PropTypes.object
}

export default List;