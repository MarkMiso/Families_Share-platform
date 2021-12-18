import React, { useEffect, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import CalendarBlock from "./CalendarBlock";
import moment from "moment";
import { useTranslation } from "react-i18next";

function Calendar({ eventsList }) {
  const [activeDate, setActiveDate] = useState(new Date());
  const [dateString, setDateString] = useState("");
  const [days, setDays] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const dateArray = activeDate.toDateString().split(" ");
    const tmpDateString = dateArray[1] + " " + dateArray[3]

    let filteredEvents = [];
    if (eventsList) {
      filteredEvents = eventsList.filter((item) => {
        const date = moment(item.start.dateTime).format("MMM YYYY")
        return (date === tmpDateString) ? item : null
      })
    }

    let daysList = [];
    for (let i = 0; i < (new Date(activeDate.getFullYear(), activeDate.getMonth(), 0).getDay()); i++) {
      daysList.push({number: 0, events: []})
    }

    for (let i = 1; i <= (new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 0).getDate()); i++) {
      daysList.push({number: i, events: []});
    }

    daysList.map((day) => {
      if (filteredEvents) {
        filteredEvents.forEach((event) => {
          if (day.number >= moment(event.start.dateTime).format("D") && day.number <= moment(event.end.dateTime).format("D")) {
            day.events.push(event)
          }
        })
      }
  
      return day;
    })

    setDateString(tmpDateString)
    setDays(daysList)
  },[activeDate, eventsList])

  return (
    <div className="bg-white w-full rounded-xl shadow-md p-5">
      <div className="flex justify-center items-center">
        <button className="bg-pink-500 text-white rounded-md p-2" onClick={() => {
          if (activeDate.getMonth() === 0) {
            setActiveDate(new Date(activeDate.getFullYear() - 1, 11, 1))
          } else {
            setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1))
          }
        }}>
          <ChevronLeftIcon className="h-4 w-4"/>
        </button>
        <p className="text-xl mx-3 leading-none text-center w-24 text-transparent bg-clip-text font-black bg-gradient-to-r from-pink-500 to-purple-500">
          {dateString}
        </p>
        <button className="bg-purple-500 text-white rounded-md p-2" onClick={() => {
          if (activeDate.getMonth() === 11) {
            setActiveDate(new Date(activeDate.getFullYear() + 1, 0, 1))
          } else {
            setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1))
          }
        }}>
          <ChevronRightIcon className="h-4 w-4"/>
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 text-center font-semibold text-gray-900">
        <div className="p-1">{t('mon')}</div>
        <div className="p-1">{t('tue')}</div>
        <div className="p-1">{t('wed')}</div>
        <div className="p-1">{t('thu')}</div>
        <div className="p-1">{t('fri')}</div>
        <div className="p-1">{t('sat')}</div>
        <div className="p-1">{t('sun')}</div>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold text-gray-500">
        {days.map((item) => {return (<CalendarBlock day={item} />)})}
      </div>
    </div>
  )
}

export default Calendar;