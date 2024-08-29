import React from 'react'
import Link from "next/link";
import { useTranslations } from 'next-intl';

const ConfirmPage = () =>{
  const t = useTranslations('Confirm');
  return (
    <div>
        <div className="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-6xl font-bold">{t('thankyou')}</h1>
          <p className="text-3xl text-gray-500">{t('orderSuccess')}</p>
          <p className="text-xl mt-10 text-gray-500"> {t('thankyouForChoosingUs')}</p>
          <Link
            className="bg-green-700 hover:bg-green-800 text-white font-semibold flex items-center space-x-2 px-10 py-3 rounded-3xl"
            href="/"
            
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>
              {t('home')}
            </span>
          </Link>
        </div>
      </div>
  )
}

export default ConfirmPage