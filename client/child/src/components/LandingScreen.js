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
      <div className="max-w-7xl mx-auto h-96 px-2 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="flex justify-center">
          <button className="shadow text-white text-xl font-semibold px-5 py-1 rounded-md bg-gradient-to-r from-yellow-500 to-red-500">
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