import React, { Fragment, useState, useEffect } from "react";
import { ArrowLeftIcon, CheckIcon, SelectorIcon, UserGroupIcon, ChevronDoubleRightIcon, DocumentTextIcon, LocationMarkerIcon, LinkIcon, ColorSwatchIcon, PlusIcon, CalendarIcon, ClockIcon, XIcon } from "@heroicons/react/outline";
import { Link } from 'react-router-dom';
import { Listbox, Transition, Dialog } from '@headlessui/react';
import { fetchGroups } from "../services/userService";
import { fetchGroup } from "../services/GroupService";
import { useAuth } from "./AuthProvider";
import { useTranslation } from "react-i18next";

function NewActivityPage() {
  const auth = useAuth();
  const [selected, setSelected] = useState(null);
  const [groups, setGroups] = useState(null);
  const [eventList, setEventList] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false); 
  const [activityColor, setActivityColor] = useState("#f44336");
  let { t } = useTranslation();

  useEffect(() => {
    async function setData() {
      const groupRes = await fetchGroups(auth.user.id);
      const fullGroupsRes = await Promise.all(groupRes.map(async (group) => {
        return await fetchGroup(group.group_id);
      }))

      setSelected(fullGroupsRes[0]);
      setGroups(fullGroupsRes);
    }

    setData();
  },[auth.user.id])

  function handleSubmit(event) {
    //todo: handle submit
  }

  function handleAddEvent(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let newEvent = {};
    newEvent.date = formData.get('date');
    newEvent.startTime = formData.get('from');
    newEvent.endTime = formData.get('to');

    if (eventList) {
      setEventList([...eventList, newEvent]);
    } else {
      setEventList([newEvent])
    }

    setShowEventForm(false);
  }
  
  function eventListBlock(event) {
    return (
      <div className="flex items-center pb-5 mx-5 mt-5 font-semibold border-b-2 border-gray-200">
        <div className="flex items-center p-3 rounded-md border-2 border-gray-200 shadow-inner">
          <p className="text-gray-500">
            {event.date}
          </p>
        </div>
        <div className="px-5 text-left">
          <p className={`text-xl inline-block font-black  text-activity-${activityColor}`}>
            tets
          </p>
          <p className="text-gray-400">
            {event.startTime} - {event.endTime}
          </p>
        </div>
        <div className="shadow-inner p-1 ml-auto rounded-md text-purple-500 border-purple-500 border-2 hover:bg-purple-500 hover:text-white cursor-pointer" onClick={() => setEventList(eventList.filter((item) => {return event !== item}))}>
          <XIcon className="h-6 w-6"/>
        </div>
      </div>
    )
  }

  function SelectGroup() {
    if (!groups) {
      return (
        <div>dio</div>
      )
    }

    return (
      <div className="w-full">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative flex items-center w-full p-5 text-left bg-white rounded-xl shadow-md font-semibold text-gray-900">
              <div className="mr-5">
                <UserGroupIcon className="h-5 w-5 text-gray-900"/>
              </div>
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full mt-1 text-base bg-white rounded-xl shadow-md">
                {groups.map((group) => (
                  <Listbox.Option
                    key={group.group_id}
                    className={({ active }) =>
                      `${active ? 'text-gray-900 bg-gray-100' : 'text-gray-500'}
                            cursor-pointer relative py-2 pl-14 pr-4 m-1 rounded-xl`
                    }
                    value={group}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className="font-semibold">
                          {group.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <CheckIcon className="w-6 h-6" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex items-center justify-between h-16">
            <Link className="p-2 text-gray-400 hover:text-black" to='/myfamilyshare/activities'>
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto px-2 flex flex-col items-center sm:px-6 lg:px-8">
          <div className="w-full flex items-center mt-4">
            <SelectGroup/>
          </div>
          <div className="mt-3 w-full p-5 shadow-md rounded-xl bg-white divide-y text-gray-900">
            <div className="flex items-center">
              <ChevronDoubleRightIcon className="h-6 w-6 mr-5"/>
              <input name="title" type="text" className="w-full focus:outline-none font-semibold" placeholder={t('name')}/>
            </div>
            <div className="flex items-center mt-5 pt-5">
              <DocumentTextIcon className="h-6 w-6 mr-5"/>
              <input name="description" type="text" className="w-full focus:outline-none font-semibold" placeholder={t('description')}/>
            </div>
            <div className="flex items-center mt-5 pt-5">
              <LocationMarkerIcon className="h-6 w-6 mr-5"/>
              <input name="location" type="text" className="w-full focus:outline-none font-semibold" placeholder={t('location')}/>
            </div>
            <div className="flex items-center mt-5 pt-5">
              <LinkIcon className="h-6 w-6 mr-5"/>
              <input name="link" type="text" className="w-full focus:outline-none font-semibold" placeholder={t('links')}/>
            </div>
            <div className="flex items-center mt-5 pt-5">
              <ColorSwatchIcon className="h-6 w-6 mr-5"/>
              <div className="w-full flex flex-wrap gap-3 md:justify-between">
                {activityColor === "#f44336" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#f44336 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#f44336 hover:shadow-md hover:bg-activity-#f44336"  onClick={() => setActivityColor('#f44336')}/>)}
                {activityColor === "#e91e63" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#e91e63 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#e91e63 hover:shadow-md hover:bg-activity-#e91e63"  onClick={() => setActivityColor('#e91e63')}/>)}
                {activityColor === "#9c27b0" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#9c27b0 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#9c27b0 hover:shadow-md hover:bg-activity-#9c27b0"  onClick={() => setActivityColor('#9c27b0')}/>)}
                {activityColor === "#673ab7" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#673ab7 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#673ab7 hover:shadow-md hover:bg-activity-#673ab7"  onClick={() => setActivityColor('#673ab7')}/>)}
                {activityColor === "#3f51b5" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#3f51b5 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#3f51b5 hover:shadow-md hover:bg-activity-#3f51b5"  onClick={() => setActivityColor('#3f51b5')}/>)}
                {activityColor === "#2196f3" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#2196f3 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#2196f3 hover:shadow-md hover:bg-activity-#2196f3"  onClick={() => setActivityColor('#2196f3')}/>)}
                {activityColor === "#03a9f4" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#03a9f4 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#03a9f4 hover:shadow-md hover:bg-activity-#03a9f4"  onClick={() => setActivityColor('#03a9f4')}/>)}
                {activityColor === "#00bcd4" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#00bcd4 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#00bcd4 hover:shadow-md hover:bg-activity-#00bcd4"  onClick={() => setActivityColor('#00bcd4')}/>)}
                {activityColor === "#009688" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#009688 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#009688 hover:shadow-md hover:bg-activity-#009688"  onClick={() => setActivityColor('#009688')}/>)}
                {activityColor === "#4caf50" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#4caf50 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#4caf50 hover:shadow-md hover:bg-activity-#4caf50"  onClick={() => setActivityColor('#4caf50')}/>)}
                {activityColor === "#8bc34a" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#8bc34a hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#8bc34a hover:shadow-md hover:bg-activity-#8bc34a"  onClick={() => setActivityColor('#8bc34a')}/>)}
                {activityColor === "#cddc39" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#cddc39 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#cddc39 hover:shadow-md hover:bg-activity-#cddc39"  onClick={() => setActivityColor('#cddc39')}/>)}
                {activityColor === "#ffeb3b" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#ffeb3b hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#ffeb3b hover:shadow-md hover:bg-activity-#ffeb3b"  onClick={() => setActivityColor('#ffeb3b')}/>)}
                {activityColor === "#ffc107" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#ffc107 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#ffc107 hover:shadow-md hover:bg-activity-#ffc107"  onClick={() => setActivityColor('#ffc107')}/>)}
                {activityColor === "#ff9800" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#ff9800 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#ff9800 hover:shadow-md hover:bg-activity-#ff9800"  onClick={() => setActivityColor('#ff9800')}/>)}
                {activityColor === "#ff5722" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#ff5722 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#ff5722 hover:shadow-md hover:bg-activity-#ff5722"  onClick={() => setActivityColor('#ff5722')}/>)}
                {activityColor === "#795548" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#795548 hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#795548 hover:shadow-md hover:bg-activity-#795548"  onClick={() => setActivityColor('#795548')}/>)}
                {activityColor === "#607d8b" ? (<div className="cursor-pointer w-5 h-5 rounded-full bg-activity-#607d8b hover:shadow-md"/>) : (<div className="cursor-pointer w-5 h-5 rounded-full border-2 border-activity-#607d8b hover:shadow-md hover:bg-activity-#607d8b"  onClick={() => setActivityColor('#607d8b')}/>)}

              </div>
            </div>
          </div>
          <div className="mt-3 w-full shadow-md rounded-xl bg-white text-gray-900">
            <div className="mx-5 pt-5 pb-5 border-b-2 font-semibold">
              {t('event list')}
            </div>
            {eventList ? (
              <div className="grid grid-cols-1">
                {eventList.map((event) => {
                  return (eventListBlock(event))
                })}
              </div>
            ) : (<></>)}
            <div className="mb-5 mx-5 pt-5 flex">
              <div className="shadow-inner p-1 rounded-md text-pink-500 border-pink-500 border-2 hover:bg-pink-500 hover:text-white cursor-pointer" onClick={() => setShowEventForm(true)}>
                <PlusIcon className="w-5 h-5 inset-y-0 right-0"/>
              </div>
            </div>
          </div>
          <button type="submit" className="mt-3 shadow-md transition ease-in-out duration-300 w-full py-3 font-semibold rounded-xl text-white bg-gradient-to-r from-pink-500 to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:shadow-xl">
            {t('submit')}
          </button>
        </div>
      </form>

      <Dialog onClose={() => setShowEventForm(false)} open={showEventForm} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative max-w-sm mx-auto">
            <form onSubmit={handleAddEvent} className="bg-white rounded-xl grid grid-cols-1 divide-y-2 divide-gray-200 shadow-md overflow-hidden">
              <div className="w-full p-3 bg-white divide-y text-gray-900">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-5"/>
                  <input name="date" type="date" className="w-full focus:outline-none font-semibold " placeholder="adsf"/>
                </div>
                <div className="flex items-center mt-3 pt-3">
                  <ClockIcon className="h-5 w-5 mr-5"/>
                  <div className="font-semibold">
                    <input name="from" type="time" className="w-full focus:outline-none font-semibold" placeholder="adsf"/>
                    <input name="to" type="time" className="w-full focus:outline-none font-semibold" placeholder="adsf"/>
                  </div>
                </div>
              </div>
              <div className="bg-white flex divide-x-2 text-gray-500 text-lg">
                <div className="flex-1 font-semibold text-center hover:bg-gray-100 p-3" onClick={() => setShowEventForm(false)}>
                  close
                </div>
                <button type="submit" className="flex-1 font-semibold hover:bg-gray-100 p-3">
                  save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default NewActivityPage;