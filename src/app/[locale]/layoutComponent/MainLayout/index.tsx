"use client";
import { useState, useEffect } from "react";
import FooterLayout from "../FooterLayout";
import { Dialog, Popover } from "@headlessui/react";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

import { getSingleUser } from "../../cart/request";

import Link from "next/link";
import { ChildrenProps } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import logo from "../../../../../public/image/logo.png";
import LocalSwitcher from "@/components/LocalSwitcher";

import { useLocale, useTranslations } from 'next-intl';

const MainLayout = ({ children }: ChildrenProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("ru");

  const locale = useLocale();

  const cart = useSelector((state: any) => state.cart.items);

  const pathname = usePathname();

  const t = useTranslations("Profile");

  const isActive = (currentPathname: unknown) => pathname === currentPathname;

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getSingleUser();
      } catch (error) {
        console.log(error);
      }
    };

    getUser();

    const nextLocale = localStorage.getItem("NEXT_LOCALE");
    if (nextLocale) {
      setSelectedLanguage(nextLocale);
    }

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      setAccessToken(accessToken);
      setLoggedInStatus(true);
    }

    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop >= 20);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logOutFromProfile = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/");
  }


  return (
    <>
    <header className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-white' : 'bg-transparent border:none'}`}>
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image className="h-10 w-auto" src={logo} alt="logo" />
            </Link>
          </div>

          <Popover.Group className="lg:hidden">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Signature Send
            </a>
          </Popover.Group>

          <div className="flex lg:hidden w-[6rem] flex align-center justify-between mr-[1rem]">
            <Link href="/cart" className="pt-2">
              <Badge color="#15803d" count={cart.length > 0 ? cart.length : 0}>
                <ShoppingCartIcon
                  className={`${
                    isActive("/cart")
                      ? ` h-6 w-6 fill-black`
                      : `h-6 w-6 hover:fill-black`
                  }`}
                  aria-hidden="true"
                />
              </Badge>
            </Link>

            <div className="flex items-center">
            <LocalSwitcher />
            </div>

            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
             {!mobileMenuOpen && <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
            </button>

            
            
          </div>


          {!loggedInStatus ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {t('login')}
              </Link>
              <Link href="/cart" className="ml-4 mr-4">
                <Badge
                  color="#15803d"
                  count={cart.length > 0 ? cart.length : 0}
                >
                  <ShoppingCartIcon
                    className={`${
                      isActive("/cart")
                        ? ` h-6 w-6 fill-black`
                        : `h-6 w-6 hover:fill-black`
                    }`}
                    aria-hidden="true"
                  />
                </Badge>
              </Link>

              <LocalSwitcher />
            </div>
          ) : (
            <div className="hidden lg:flex align-center lg:flex-1 lg:justify-end lg:w-8">
              <Link href="/profile">
                <span className="ant-badge ant-badge-status css-dev-only-do-not-override-gzal6t">
                <UserIcon
                  className={`${
                    isActive(`/${locale}/profile`)
                      ? ` h-6 w-6 fill-black`
                      : `h-6 w-6 hover:fill-black`
                  }`
                }
                  aria-hidden="true"
                />
                </span>
              </Link>

              <Link href="/cart" className="ml-4 mr-4">
                <Badge
                  color="#15803d"
                  count={cart.length > 0 ? cart.length : 0}
                >
                  <ShoppingCartIcon
                    className={`${
                      isActive(`/${locale}/cart`)
                        ? ` h-6 w-6 fill-black`
                        : `h-6 w-6  hover:fill-black`
                    }`}
                    aria-hidden="true"
                  />
                </Badge>
              </Link>
              <>
                <LocalSwitcher />
              </>
            </div>
          )}
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                {/* <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                /> */}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-10 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  
                  <Link
                    href="/profile/orders"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setTimeout(() => setMobileMenuOpen(false), 500)}
                  >
                   {t('orders')}
                  </Link>
                  <Link
                    href="/profile/delivery-location"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setTimeout(() => setMobileMenuOpen(false), 500)}
                  >
                    {t('deliveryLocation')}
                  </Link>
                  <Link
                    href="/profile/add-product"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setTimeout(() => setMobileMenuOpen(false), 500)}
                  >
                    {t('addYourOwnProduct')}
                  </Link>
                </div>

                {!accessToken && !refreshToken ? (
                  <div className="py-6">
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {t('login')}
                    </a>
                  </div>
                ) : (
                  <div className="py-6">
                    <Link
                      href="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {t('profile')} 
                    </Link>


                    <div
                      onClick={logOutFromProfile}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {t('logOut')} 
                    </div>

                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        {/* <hr className={`h-px  bg-gray-200 border-0 dark:bg-gray-700`} /> */}
              {pathname.length > 3 && <hr className={`h-px  bg-gray-200 border-0 dark:bg-gray-700`} />}

      </header>
      <div className="max-w-7xl w-full m-auto p-5 pt-24 pb-0 min-h-[85vh]">
        {children}
      </div>
      <FooterLayout />
    </>
  );
};

export default dynamic(() => Promise.resolve(MainLayout), { ssr: false });
