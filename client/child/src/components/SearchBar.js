import React, {useState} from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { SearchIcon } from "@heroicons/react/outline";
import List from "./List";
import LoadingSpinner from "./LoadingSpinner";

// TODO: optimize
function SearchBar({ data, dataInfo }) {
  const [filteredData, setFilteredData] = useState(data);
  const { t } = useTranslation();

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setFilteredData(data.filter((item) => {
      return item.name.includes(searchWord);
    }));
  }

  return(
    <div name="SearchBarContainer" className="w-full">
      <div className="flex items-center rounded-xl bg-white shadow-md overflow-hidden">
        <input name="search" type="text" placeholder={t('search')} onChange={handleFilter} className="font-semibold transition appearance-none w-full px-4 py-3 text-gray-900 focus:outline-none"/>
        <button className="p-3">
          <SearchIcon className="text-gray-400 font-semibold color h-6 w-6"/>
        </button>
      </div>
      <div className="mt-3">
        {filteredData ? (
            <List data={filteredData} blockInfo={dataInfo}/>
          ) : (
            <p>
              <LoadingSpinner />
            </p>
        )}
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  type: PropTypes.object,
  data: PropTypes.array
}

export default SearchBar;