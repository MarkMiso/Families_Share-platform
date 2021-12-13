import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileDropdown from "./ProfileDropdown";
import Notifications from "./Notifications"
import { useAuth } from "./AuthProvider";
import PropTypes from "prop-types";

import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import SelectLanguage from "./SelectLanguage";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar({ navigation }) {
  const { t } = useTranslation();
  let auth = useAuth();
  let circles = (<></>)

  if (auth.user) {
    circles = (
      <>
        <Notifications />
        <ProfileDropdown />
      </>
    )
  }

  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center h-full sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* TODO: logo e/o immagine */}
                  <text className="text-black font-black text-xl lg:hidden">FS</text>
                  <text className="text-black font-black text-xl hidden lg:block">Families Share</text>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex items-center h-full space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'text-black border-b-2 border-yellow-500' : 'text-gray-500 hover:text-black',
                          'h-full px-3 py-5 font-semibold'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {t(item.name)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <SelectLanguage />
                { circles }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? ' text-black bg-gray-100 border-l-2 border-yellow-500 shadow-inner' : 'text-gray-500 hover:text-black hover:bg-gray-100',
                    'block px-3 py-2 text-base rounded-md font-semibold'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {t(item.name)}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

Navbar.propTypes = {
  navigation: PropTypes.array
}

export default Navbar;