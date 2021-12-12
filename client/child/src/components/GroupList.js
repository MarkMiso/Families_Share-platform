import React from "react";
import PropTypes from "prop-types";
import GroupBlock from "./GroupBlock";

function GroupList({ groupIDs }) {
  return (
    <div className="w-full mt-5">
      {groupIDs.map((item) => (
        <GroupBlock groupId={item}/>
      ))}
    </div>
  )
}

GroupList.propTypes = {
  groupIDs: PropTypes.array
}

export default GroupList;