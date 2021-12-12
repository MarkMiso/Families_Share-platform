import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import EventBlock from "./EventBlock";

function EventsList({ events,}) {
  let { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl grid grid-cols-1 divide-y-2 divide-gray-200 shadow-md overflow-hidden">
      {events.length > 0 ? (events.map((item) => (<EventBlock event={item}/>))) : (
        <p className="p-5 font-semibold text-gray-400">
          {t('no results')}
        </p>
      )}
    </div>
  )
}

EventsList.propTypes = {
  groupIDs: PropTypes.object
}

export default EventsList;