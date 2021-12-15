import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Navbar from "./Navbar";
import { useAuth } from './AuthProvider';

const generalNav = [
  { name: 'home', href: '#', current: true }
]

function LandingScreen() {
  const { t } = useTranslation();
  let auth = useAuth();

  if (auth.user) {
    return (
      <Navigate to="/myfamilyshare" />
    )
  }

  return (
    <div className="landingScreenContainer">
      <Navbar navigation={generalNav}/>
      <div className="max-w-7xl mx-auto h-96 px-2 flex justify-center sm:px-6 lg:px-8">
        <div className="text-center h-full md:w-4/5 sm:w-full">
          <p className="mt-12 text-5xl text-transparent bg-clip-text font-black bg-gradient-to-r from-yellow-500 to-red-500 pt-3">
            Families Share 
          </p>
          <p className="font-semibold text-lg text-gray-500 py-8">
            {t('app description')}
          </p>
          <Link className="flex-none shadow-lg text-white text-xl font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-yellow-500 to-red-500" to="/login">
            {t('login')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingScreen;