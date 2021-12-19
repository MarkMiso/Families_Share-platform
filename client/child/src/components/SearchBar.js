import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { SearchIcon } from "@heroicons/react/outline";
import List from "./List";

function SearchBar({ data, dataInfo }) {
  const [filteredData, setFilteredData] = useState(null);
  const { t } = useTranslation();

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setFilteredData(data.filter((item) => {
      return item.name.includes(searchWord);
    }));
  }

  useEffect(() => {
    setFilteredData(data);
  },[data])

  return(
    <div name="SearchBarContainer" className="w-full">
      <div className="flex items-center rounded-xl bg-white shadow-md overflow-hidden">
        <input name="search" type="text" placeholder={t('search')} onChange={handleFilter} className="font-semibold transition appearance-none w-full px-4 py-3 text-gray-900 focus:outline-none"/>
        <button className="p-3">
          <SearchIcon className="text-gray-400 font-semibold color h-6 w-6"/>
        </button>
      </div>
      <div className="mt-3">
        <List data={filteredData} blockInfo={dataInfo}/>
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  type: PropTypes.object,
  data: PropTypes.array
}

export default SearchBar;