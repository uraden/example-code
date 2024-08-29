"use client";
import MainLayout from "../layoutComponent/MainLayout";
import Link from "next/link";
import { ChildrenProps } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import { MdOutlineListAlt, MdPersonOutline, MdLocationOn, MdOutlineAddchart } from "react-icons/md";
import { toast } from 'sonner'
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';
import { logOut } from "./profile/request";


export default function ProfileLayout({ children }: ChildrenProps) {
  const pathname = usePathname();
  const t = useTranslations('Profile');

  const isActive = (currentPathname: unknown) => pathname === currentPathname;

  const router = useRouter();

  const locale = useLocale();

  // remove localStoage.accessToken and localStoage.refreshToken

  const logOutFromProfile = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/");
  }


  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:flex flex-col w-64 bg-white border-r">
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="">
              <li className="py-1">
                <Link
                  href="/profile"
                  className={`${
                    isActive(`/${locale}/profile`) || isActive('/profile')
                      ? "bg-black text-white rounded-tl-2xl rounded-bl-2xl"
                      : ""
                  } rounded-tl-2xl rounded-bl-2xl relative flex flex-row items-center h-11 focus:outline-none hover:bg-black text-gray-600 hover:text-white pr-6`}
                >
                  <span className="inline-flex justify-center items-center ml-4">
      
                    <MdPersonOutline style={{height: 20, width: 20}}/>

                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {t('profile')}
                  </span>
                </Link>
              </li>

              <li className="py-1">
                <Link
                  href="/profile/orders"
                  className={`${
                    isActive(`/${locale}/profile/orders`|| isActive('/profile/orders'))
                      ? "bg-black text-white rounded-tl-2xl rounded-bl-2xl"
                      : ""
                  } rounded-tl-2xl rounded-bl-2xl relative flex flex-row items-center h-11 focus:outline-none hover:bg-black text-gray-600 hover:text-white pr-6`}
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    
                  <MdOutlineListAlt style={{height: 20, width: 20}}/>

                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {t('orders')}
                  </span>
                </Link>
              </li>


              <li className="py-1">
                <Link
                  href="/profile/delivery-location"
                  className={`${
                    isActive(`/${locale}/profile/delivery-location` || isActive('/profile/delivery-location'))
                      ? "bg-black text-white"
                      : ""
                  } rounded-tl-2xl rounded-bl-2xl relative flex flex-row items-center h-11 focus:outline-none hover:bg-black text-gray-600 hover:text-white pr-6`}
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    
                  <MdLocationOn style={{height: 20, width: 20}}/>

                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                   {t('deliveryLocation')}
                  </span>
                </Link>
              </li>


              <li className="py-1">
                <Link
                  href="/profile/add-product"
                  className={`${
                    isActive(`/${locale}/profile/add-product` || isActive('/profile/add-product'))
                      ? "bg-black text-white"
                      : ""
                  } rounded-tl-2xl rounded-bl-2xl relative flex flex-row items-center h-11 focus:outline-none hover:bg-black text-gray-600 hover:text-white pr-6`}
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    
                  <MdOutlineAddchart style={{height: 20, width: 20}}/>

                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {t('addProduct')}
                  </span>
                </Link>
              </li>


              {/* <li className="py-1">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Notifications
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                    1.2k
                  </span>
                </a>
              </li>
              
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Tasks
                  </div>
                </div>
              </li>
              <li className="py-1">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Available Tasks
                  </span>
                </a>
              </li>
              <li className="py-1">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Clients
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                    15
                  </span>
                </a>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Settings
                  </div>
                </div>
              </li>

              <li className="py-1">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Settings
                  </span>
                </a>
              </li> */}
              <li className="py-1 hover:cursor-pointer">
                <a
                  className="relative flex flex-row items-center h-11 focus:outline-none rounded-tl-2xl rounded-bl-2xl hover:bg-gray-50 text-gray-600 hover:text-gray-800 pr-6"
                  onClick={logOutFromProfile}
                  >
                   <span className="ml-2 text-sm tracking-wide truncate">
                    {t('logOut')}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 ml-0 ms:ml-68">
          <div className="xl:ml-10 xl:mr-10 ml-[0.5rem] mr-[0.5rem] mt-4">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
