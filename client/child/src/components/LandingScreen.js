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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mt-12 text-6xl font-bold">Families Share</h1>
          <p className="mt-3 text-gray-700 text-xl">{t('app description')}</p>
          <button className="mt-5 bg-gray-800 rounded px-4 py-1 text-white">
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