import React from "react";

import { RefreshIcon } from "@heroicons/react/outline";

function LoadingSpinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="rounded-full bg-white shadow-md p-3">
        <RefreshIcon className="text-gray-400 animate-spin transform rotate-180 h-6 w-6"/>
      </div>
    </div>
  );
}

export default LoadingSpinner;