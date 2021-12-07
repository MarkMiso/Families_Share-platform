import React from "react";
import PropTypes, { func } from "prop-types";
import Navbar from "./Navbar";
import { useTranslation } from 'react-i18next';

function LandingScreen(language) {
  const { t, i18n } = useTranslation();

  return (
    <div className="landingScreenContainer">
      <Navbar navigation={[
        { name: 'Dashboard', href: '#', current: true },
        { name: 'boi', href: '#', current: false }
        ]} />
      <div className="max-w-7xl mx-auto h-96 px-2 flex justify-center sm:px-6 lg:px-8">
        <div className="text-center h-full md:w-4/5 sm:w-full">
          <p className="mt-12 text-5xl text-transparent bg-clip-text font-black bg-gradient-to-r from-yellow-500 to-red-500 pt-3">
            Families Share 
          </p>
          <p className="font-semibold text-lg text-gray-500 py-8">
            {t('app description')}
          </p>
          <button className="flex-none shadow-lg text-white text-xl font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-yellow-500 to-red-500">
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  );
}

LandingScreen.propTypes = {
};

export default LandingScreen;