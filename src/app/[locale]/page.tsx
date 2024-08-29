"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import MainLayout from "./layoutComponent/MainLayout";
import { useTranslations } from "next-intl";

import type { CollapseProps } from "antd";
import { Collapse } from "antd";

import { getAllProducts } from "./request";
import yellowBgHomePageLow from "../../../public/image/yellowbghomePageLow.jpg";

import savingIcon from "../../../public/icons/saving.png";
import qualityAndConsistencyIcon from "../../../public/icons/premium.png";
import exclusiveIcon from "../../../public/icons/exclusive.png";
import flexibleIcon from "../../../public/icons/flexible.png";
import drink from "../../../public/icons/drink.png";

import cookieIcon from "../../../public/icons/cookie.png";
import hygiene from "../../../public/icons/hygiene.png";

import stationary from "../../../public/icons/stationary.png";
import cup from "../../../public/icons/cup.png";
import Link from "next/link";

import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const t = useTranslations("Index");

  useEffect(() => {
    const getAllDeliveryLocations = async () => {
      const response = await getAllProducts();
      // setProducts(response?.data?.products);
    };
    getAllDeliveryLocations();
  }, []);

  const itemsCollapse: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <h3 className="text-base font-semibold">
          {t("cancelSubscriptionTime")}
        </h3>
      ),
      children: (
        <p className="text-gray-500">{t("cancelSubscriptionTimeText")}</p>
      ),
    },
    {
      key: "2",
      label: (
        <h3 className="text-base font-semibold">
          {t("howToPayForSubscription")}
        </h3>
      ),
      children: (
        <p className="text-gray-500">{t("howToPayForSubscriptionText")}</p>
      ),
    },
    {
      key: "3",
      label: (
        <h3 className="text-base font-semibold">
          {t("howCanChangeDeliveryAddress")}
        </h3>
      ),
      children: (
        <p className="text-gray-500">{t("howCanChangeDeliveryAddressText")}</p>
      ),
    },
    {
      key: "4",
      label: (
        <h3 className="text-base font-semibold">
          {t("howCanIChangeDeliveryDate")}
        </h3>
      ),
      children: (
        <p className="text-gray-500">{t("howCanIChangeDeliveryDateText")}</p>
      ),
    },
    {
      key: "5",
      label: (
        <h3 className="text-base font-semibold">
          {t("howCanIChangeQuantity")}
        </h3>
      ),

      children: (
        <p className="text-gray-500">{t("howCanIChangeQuantityText")}</p>
      ),
    },
  ];

  const onChangeCollapse = (key: string | string[]) => {
    console.log(key);
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  return (
    <div>
      <div className="flex items-center justify-center">
        <Image
          data-aos="flip-up"
          className="top-head-image"
          src={yellowBgHomePageLow}
          alt="cartLaptopHomePage"
          placeholder="blur"
          style={{ height: '100vh' }}
        />

        <div className="home-top-text absolute left-40 text-white flex flex-col justify-center content-center rounded-10 rounded-xl">
          <div 
            data-aos="fade-right"
            className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-l text-gray-500">
            {t("elevateYourExperience")}
          </div>
          <div 
            data-aos="fade-left"
            className="xl:mt-5 xl:text-2xl lg:mt-5 lg:text-xl md:mt-3 md:text-l sm:mt-1 sm:text-sm text-xs mt-2 text-gray-500">
            {t("elevateYourExperienceText")}
          </div>
        </div>
      </div>
      <MainLayout>
        <div className="main-page">
          <div className="sub-main">
            <section className="container mx-auto xl:px-8 px-[0.1rem] py-8">
              <h2 
                data-aos="fade-up"
                className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-l block flex justify-center antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 !text-3xl !leading-snug lg:!text-4xl choose-category">
                {t("chooseFromCategories")}
              </h2>

              <div 
                data-aos="fade-up"
                className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
                <Link href="/cookie" className="hover:shadow-xl">
                  <div className="flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[15rem] h-180 items-end overflow-hidden rounded-xl">
                    <Image
                      src={cookieIcon}
                      alt="bg"
                      className="icon-home absolute inset-0 object-cover object-center"
                    />
                    <h1 className="flex items-center text-xl justify-center mb-5">
                      {t("snacks")}
                    </h1>
                  </div>
                </Link>

                <Link href="/beverage" className="hover:shadow-xl">
                  <div className="flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[15rem] items-end overflow-hidden rounded-xl">
                    <Image
                      src={drink}
                      alt="bg"
                      className="icon-home-drink absolute inset-0 object-cover object-center"
                      style={{ color: "red" }}
                    />
                    <h1 className="flex items-center text-xl justify-center mb-5">
                      {t("beverages")}
                    </h1>
                  </div>
                </Link>

                <Link href="/hygiene" className="hover:shadow-xl">
                  <div className="flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[15rem] items-end overflow-hidden rounded-xl">
                    <Image
                      src={hygiene}
                      alt="bg"
                      className="icon-home absolute inset-0 object-cover object-center"
                    />
                    <h1 className="flex items-center text-xl	 justify-center mb-5">
                      {t("hygiene")}
                    </h1>
                  </div>
                </Link>

                <Link href="/stationary" className="hover:shadow-xl">
                  <div className="flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[15rem] items-end overflow-hidden rounded-xl">
                    <Image
                      src={stationary}
                      alt="bg"
                      className="icon-home absolute inset-0 object-cover object-center"
                    />
                    <h1 className="flex items-center text-xl	 justify-center mb-5">
                      {t("stationary")}
                    </h1>
                  </div>
                </Link>

                <Link href="/coffee" className="hover:shadow-xl">
                  <div className="flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[15rem] items-end overflow-hidden rounded-xl">
                    <Image
                      src={cup}
                      alt="bg"
                      className="icon-home absolute inset-0 object-cover object-center"
                    />
                    <h1 className="flex items-center text-xl	 justify-center mb-5">
                      {t("coffeeAndTea")}
                    </h1>
                  </div>
                </Link>
              </div>
            </section>
          </div>

          <div className="sub-main py-14">
            <h1 
              data-aos="fade-up"
              className="block flex justify-center antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 !text-3xl !leading-snug lg:!text-4xl choose-category">
              {t("weOffer")}
            </h1>
            <p 
              data-aos="fade-up"
              className="flex justify-center mt-5 text-gray-500 text-lg xl:ml-10 xl:mr-10 ml-[0.1rem] mr-[0.1rem]">
              {t("weOfferText")}
            </p>
            <div 
              data-aos="fade-up"
              className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 container mx-auto xl:px-8 px-[0.1rem] py-8">
              <div className="h-68 p-5 rounded-lg border hover:bg-gray-200 hover:shadow-2xl">
                <Image
                  className="offer-image"
                  src={savingIcon}
                  alt="cartLaptopHomePage"
                  placeholder="blur"
                />
                <h2 className="text-xl font-semibold mt-5">{t("feature1")}</h2>
                <p className="text-gray-500 mt-2">{t("feature1Text")}</p>
              </div>

              <div className="h-68 p-5 rounded-lg border hover:bg-gray-200 hover:shadow-2xl">
                <Image
                  className="offer-image"
                  src={qualityAndConsistencyIcon}
                  alt="cartLaptopHomePage"
                  placeholder="blur"
                />
                <h2 className="text-xl font-semibold mt-5">{t("feature2")}</h2>
                <p className="text-gray-500 mt-2">{t("feature2Text")}</p>
              </div>

              <div className="h-68 p-5 rounded-lg border hover:bg-gray-200 hover:shadow-2xl">
                <Image
                  className="offer-image"
                  src={exclusiveIcon}
                  alt="cartLaptopHomePage"
                  placeholder="blur"
                />
                <h2 className="text-xl font-semibold mt-5">{t("feature3")}</h2>
                <p className="text-gray-500 mt-2">{t("feature3Text")}</p>
              </div>

              <div className="h-68 p-5 rounded-lg border hover:bg-gray-200 hover:shadow-2xl">
                <Image
                  className="offer-image"
                  src={flexibleIcon}
                  alt="cartLaptopHomePage"
                  placeholder="blur"
                />
                <h2 className="text-xl font-semibold mt-5">
                  {" "}
                  {t("feature4")}{" "}
                </h2>
                <p className="text-gray-500 mt-2">{t("feature4Text")}</p>
              </div>
            </div>
          </div>

          <div className="sub-main ">
            <h2 
              data-aos="fade-up"
              className="block flex justify-center antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 !text-3xl !leading-snug lg:!text-4xl choose-category">
              {t("faq")}
            </h2>

            <section 
              data-aos="fade-up"
              className="container mx-auto xl:px-8 px-[0.1rem] py-8">
              <Collapse items={itemsCollapse} onChange={onChangeCollapse} />
            </section>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
