import React from "react";
import { FaTelegramPlane, FaTwitter, FaGoogle, FaEnvelope  } from "react-icons/fa";
import { useTranslations } from "next-intl";


export default function FooterLayout() {

  const currentYear = new Date().getFullYear();

  const t = useTranslations("Index");

  return (
    <>
      <hr className="h-px bg-gray-200 mt-4 border-0 dark:bg-gray-700" />
      <footer className="w-full max-w-[85rem] py-8 px-4 sm:px-6 lg:px-8 mx-auto mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5 text-center">
          <div>
            <a
              className="flex-none text-xl font-semibold text-black dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
              aria-label="SignatureSend"
            >
              SignatureSend
            </a>
          </div>

          <ul className="text-center">
           
            <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-gray-600">
              {/* <a
              className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            > */}
              <div className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                &copy; {currentYear} SignatureSend. {t("allRightsReserved")}
              </div>

              {/* </a> */}
            </li>
          </ul>

          <div className="md:text-end space-x-2">
            <a
              className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="mailto:someone@example.com"
            >
              <FaGoogle />
            </a>
            <a
              className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="https://twitter.com/"
              target="_blank"
            >
              <FaTwitter /> 
            </a>
            
            <a 
              className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="# "
              >
             
             <FaTelegramPlane />

            </a>

            <a 
              className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="mailto:someone@example.com"
              >
             
             <FaEnvelope />

            </a>

          </div>
        </div>
      </footer>
    </>
  );
}
