import React, { useState } from "react";
import { Dialog } from '@headlessui/react';
import List from "./List";
import { useTranslation } from "react-i18next";

function CalendarBlock({ day }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  if (day.number === 0) {
    return (<div />)
  }

  return(
    <div>
      <div className="border-r p-1 cursor-pointer hover:bg-gray-100 h-full" onClick={() => {
        setIsOpen(true)
      }}>
        <p >
          {day.number}
        </p>
        {day.events.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
          {day.events.map((event) => {
            const eventColor = event.extendedProperties.shared.activityColor ? ("activity-" + event.extendedProperties.shared.activityColor) : ("black");
            
            return(
              <div className={`bg-${eventColor} w- h-2 rounded-full`} />
            )
          })}
          </div>
        ) : (
          <div />
        )}
      </div>

      <Dialog onClose={() => setIsOpen(false)} open={isOpen} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="relative max-w-sm mx-auto">
              <List data={day.events} blockInfo={{type: "event"}}>
                <button className="bg-white p-3 font-semibold text-gray-500 text-lg hover:bg-gray-100  focus:outline-none " onClick={() => setIsOpen(false)}>
                  {t('close')}
                </button>
              </List>
            </div>
        </div>
      </Dialog>
    </div>
  )
}

export default CalendarBlock;