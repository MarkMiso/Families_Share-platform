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
      <div className="max-w-3xl mx-auto px-2 flex flex-col items-center text-center sm:px-6 lg:px-8">
        <p className="mt-16 text-5xl text-transparent bg-clip-text font-black bg-gradient-to-r from-yellow-500 to-red-500">
          Families Share 
        </p>
        <p className="font-semibold text-lg text-gray-500 py-8">
          {t('app description')}
        </p>
        <Link className="flex-none shadow-lg text-white text-xl font-semibold px-12 py-2 rounded-md bg-gradient-to-r from-yellow-500 to-red-500" to="/login">
          {t('login')}
        </Link>
      </div>
    </div>
  );
}

export default LandingScreen;