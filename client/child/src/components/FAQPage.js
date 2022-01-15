import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import List from "./List";

const userNav = [
  { name: 'dashboard', href: '/myfamilyshare', current: false },
  { name: 'groups', href: '/myfamilyshare/groups', current: false },
  { name: 'activities', href: '/myfamilyshare/activities', current: false },
  { name: 'calendar', href: '/myfamilyshare/calendar', current: false }
]

const faqs = [
  {title: "faq1 question", body: "faq1 answer"},
  {title: "faq2 question", body: "faq2 answer"},
  {title: "faq3 question", body: "faq3 answer"},
  {title: "faq4 question", body: "faq4 answer"},
  {title: "faq5 question", body: "faq5 answer"},
  {title: "faq6 question", body: "faq6 answer"},
]

function FAQ() {
  const { t } = useTranslation();

  return (
    <div className="FAQContainer">
      <Navbar navigation={userNav}/>
      <div className="max-w-3xl mx-auto px-2 flex flex-col items-center sm:px-6 lg:px-8">
        <p className="p-8 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
          {t('faq')}
        </p>
        <List data={faqs} blockInfo={{type: "text"}}/>
        <Link className="text-center mt-8 shadow-md transition ease-in-out duration-300 w-full py-3 px-8 font-semibold rounded-xl text-white bg-gradient-to-r from-yellow-500 to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:shadow-xl" to="/myfamilyshare">
          {t('continue')}
        </Link>
      </div>
    </div>
  )
}

export default FAQ;