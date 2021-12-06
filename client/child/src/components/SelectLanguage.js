import React from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { TranslateIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function SelectLanguage() {
  const { t, i18n } = useTranslation();

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-800 p-1 ml-3 relative rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open translation menu</span>
          <TranslateIcon className="h-6 w-6" aria-hidden="true"/>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* TODO: generazione dinamica del drop down */}
          <Menu.Item>
            {({ active }) => (
              <div className={classNames(active ? 'bg-gray-100' : '')}>
                <button className="block px-4 py-2 text-sm text-gray-700 min-w-full text-left" onClick={() => i18n.changeLanguage('en')}>
                  English
                </button>
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div className={classNames(active ? 'bg-gray-100' : '')}>
              <button className="block px-4 py-2 text-sm text-gray-700 w-full text-left" onClick={() => i18n.changeLanguage('it')}>
                Italiano
              </button>
            </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default SelectLanguage;