import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "./AuthProvider"

export function LoginScreen() {
  let { t } = useTranslation()
  let auth = useAuth();
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email");
    let password = formData.get("password");

    auth.signin(email, password, () => { 
      navigate('/myfamilyshare')
    });
  }

  return (
    <div className="max-w-xl mx-auto px-2 flex flex-col sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mt-12 w-full p-5 shadow-lg rounded-xl bg-white">
        <div className="text-center">
          <p className="text-5xl text-transparent bg-clip-text font-black bg-gradient-to-r from-yellow-500 to-red-500 pt-3">
            Families Share 
          </p>
          <p className="font-semibold text-lg text-gray-500 py-3">
              {t('signin prompt')}
          </p>
        </div>
        <div>
          <label className="block font-semibold text-gray-500">
            {t('email')}
          </label>
          <input name="email" type="email" className="transition ease-in-out duration-300 mt-1 appearance-none rounded-md w-full px-3 py-2 border-2 border-gray-300 font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:border-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"/>
        </div>

        <div className="mt-5">
          <label className="block font-semibold text-gray-500">
            {t('password')}
          </label>
          <input name="password" type="password" className="transition ease-in-out duration-300 mt-1 appearance-none rounded-md w-full px-3 py-2 border-2 border-gray-300 font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:border-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"/>
        </div>
        
        <div className="mt-5">
          <button type="submit" className="transition ease-in-out duration-300 w-full py-2 px-3 font-semibold rounded-md text-white bg-gradient-to-r from-yellow-500 to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            {t('login')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginScreen;