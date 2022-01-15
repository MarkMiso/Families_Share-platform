import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline';
import { useAuth } from "./AuthProvider";
import { addChild, removeChild } from "../services/EventService";

function EventBlock({ event }) {
  const auth = useAuth();
  let date = moment(event.start.dateTime).format("MMM D");
  let startTime = moment(event.start.dateTime).format("HH:mm");
  let endTime = moment(event.end.dateTime).format("HH:mm");

  async function handleAdd() {
    await addChild(event, auth.user.child.child_id);
    window.location.reload()
  }

  async function handleRemove() {
    await removeChild(event, auth.user.child.child_id);
    window.location.reload()
  }

  function actionButton() {
    // todo: add/remove user from event
    if (event && event.extendedProperties.shared.children.includes(auth.user.child.child_id)) {
      return (
        <button className="p-2 ml-auto rounded-md text-purple-500 border-purple-500 border-2 hover:bg-purple-500 hover:text-white" onClick={() => {handleRemove()}}>
          <UserRemoveIcon className="h-6 w-6"/>
        </button>
      )
    }

    return (
      <button className="p-2 ml-auto rounded-md text-pink-500 border-pink-500 border-2 hover:bg-pink-500 hover:text-white" onClick={() => {handleAdd()}}>
        <UserAddIcon className="h-6 w-6"/>
      </button>
    )
  }
  
  return (
    <div className="flex items-center mb-5 mx-5 pt-5 font-semibold">
      <div className="flex items-center p-3 rounded-md border-2 border-gray-200 shadow-inner">
        <p className="text-gray-500">
          {date}
        </p>
      </div>
      <div className="px-5 text-left">
        <p className={`text-xl inline-block font-black  text-activity-${event.extendedProperties.shared.activityColor}`}>
          {event.summary}
        </p>
        <p className="text-gray-400">
          {startTime} - {endTime}
        </p>
      </div>
      {actionButton()}
    </div>

  )
}

EventBlock.propTypes = {
  event: PropTypes.object
}


export default EventBlock;