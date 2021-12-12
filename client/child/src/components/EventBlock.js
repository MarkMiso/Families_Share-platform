import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

function EventBlock({ event }) {
  let date = moment(event.start.dateTime).format("MMM D");
  let startTime = moment(event.start.dateTime).format("HH:mm");
  let endTime = moment(event.end.dateTime).format("HH:mm");
  
  return (
    <p>
      {event.summary}: {date} {startTime} - {endTime}
    </p>
  )
}

EventBlock.propTypes = {
  event: PropTypes.object
}


export default EventBlock;