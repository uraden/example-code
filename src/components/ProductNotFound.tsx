import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useTranslations} from 'next-intl';

function ProductNotFound() {
  const router = useRouter();
  const t = useTranslations('Products');

  return (
    <div>
        <section className="bg-white dark:bg-gray-900 ">
              <div className="container flex items-center h-80 mx-auto">
                <div className="flex flex-col items-center max-w-m mx-auto text-center">
                  <p className="p-3 text-sm font-medium text-green-800 rounded-full bg-green-50 dark:bg-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="green"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                  </p>
                  <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                    {t("noSuchProduct")}
                  </h1>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    {t('noSuchProductsDesc')}
                  </p>

                  <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                    <button
                      onClick={() => router.back()}
                      className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 rtl:rotate-180"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                      </svg>

                      <span>{t('goBack')}</span>
                    </button>

                    <Link
                      href="/"
                      className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-black	 rounded-lg shrink-0 sm:w-auto dark:hover:bg-blue-500 dark:bg-blue-600"
                    >
                      {t('goToMainPage')}
                    </Link>
                  </div>
                </div>
              </div>
            </section>
    </div>
  )
}

export default ProductNotFound