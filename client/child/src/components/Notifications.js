import React from "react";
import { BellIcon } from '@heroicons/react/outline';

// TODO: business logic and dropdown

function Notifications() {
  return (
    <button
      type="button"
      className="p-1 ml-3 relative rounded-md text-gray-400 hover:text-black"
    >
    <span className="sr-only">View notifications</span>
    <BellIcon className="h-6 w-6" aria-hidden="true" />
  </button>
  )
}

export default Notifications;