import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

function EventBlock({ event }) {
  let date = moment(event.start.dateTime).format("MMM D");
  let startTime = moment(event.start.dateTime).format("HH:mm");
  let endTime = moment(event.end.dateTime).format("HH:mm");
  
  return (
    <div className="cursor-pointer flex align-middle mb-5 mx-5 pt-5 font-semibold" 
      onClick={() =>{
        // TODO: manda alla schermata della attività
    }}>
      <div className="flex items-center p-3 rounded-md border-2 border-gray-200 shadow-inner">
        <p className="text-gray-500">
          {date}
        </p>
      </div>
      <div className="pl-5 text-left">
        <p className={`text-xl inline-block font-black  text-activity-${event.extendedProperties.shared.activityColor}`}>
          {event.summary}
        </p>
        <p className="text-gray-400">
          {startTime} - {endTime}
        </p>
      </div>
        
    </div>

  )
}

EventBlock.propTypes = {
  event: PropTypes.object
}


export default EventBlock;