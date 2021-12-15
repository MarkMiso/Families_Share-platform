import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// TODO: custom colors
function ActivitiesBlock({ activity }) {
  const { t } = useTranslation();

  return (
    <div className="cursor-pointer flex items-center mb-5 mx-5 pt-5 font-semibold" 
      onClick={() =>{
        // TODO: manda alla schermata della attività
    }}>
      <div className={`rounded-md shadow-inner h-12 w-12 bg-activity-${activity.color}`} />
      <div className="pl-5 text-left">
        <p className={`text-xl inline-block font-black text-activity-${activity.color}`}>
          {activity.name}
        </p>
        <p className="text-gray-400">
          {t('group')} : {activity.group_name}
        </p>
      </div>
    </div>
  )
}

ActivitiesBlock.propTypes = {
  activity: PropTypes.object
}


export default ActivitiesBlock;