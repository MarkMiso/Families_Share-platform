import React from "react";
import { Fragment } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthProvider';

// TODO: business logic

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProfileDropdown() {
  const { t } = useTranslation();
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <Menu as="div" className="ml-3 relative">
    <div>
      <Menu.Button className="flex text-sm rounded-full focus:ring-2 ring-black">
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
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
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <Link to="#" className={classNames(active ? 'bg-gray-100' : '', 'rounded-md block px-4 py-2 text-sm text-gray-700')}>
              {t('profile')}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link to="#" className={classNames(active ? 'bg-gray-100' : '', 'rounded-md mt-1 block px-4 py-2 text-sm text-gray-700')}>
              {t('settings')}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div className={classNames(active ? 'bg-gray-100' : '', 'rounded-md')}>
              <button className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                onClick={auth.signout(() => navigate('/'))}
              >
                {t('logout')}
              </button>
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
  )
};

export default ProfileDropdown;