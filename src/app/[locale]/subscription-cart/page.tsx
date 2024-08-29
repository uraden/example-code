"use client";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemByQuantity,
  clearCart,
} from "../../../reduxStore/feature/cartSlice";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import { getSingleUser } from "../cart/request";

import { addNewItemsArrayToOrder } from "./request";

import { getUserOrders } from "../(profile)/profile/orders/request";

const SubcriptionCartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const [makeOrderSuccess, setMakeOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const t = useTranslations("Checkout");
  const tPr = useTranslations("Products");
  const tFun = useTranslations("Functions");
  const tOrd = useTranslations("Orders");

  const router = useRouter();

  useEffect(() => {
    const getUserOrdersData = async () => {
      const userOrderData = await getUserOrders();
      setOrderId(userOrderData?.data?.orders[0]?._id);
    };

    getUserOrdersData();
  }, []);

  const userData = useSelector((state: any) => state?.userData?.userData);

  useLayoutEffect(() => {
    const getSingleUserData = async () => {
      try {
        const response = await getSingleUser();
        if (response.status === 200) {
          setValue("name", response?.data?.user?.name);
          setValue("email", response?.data?.user?.email);
          setValue("phone", response?.data?.user?.phone);
        } else {
          router.push(`${response.data.redirect}`);
        }
      } catch (error) {
        router.push(`/server-error`);
        toast.error("Error occurred.", {
          position: "top-right",
          duration: 3500,
        });
        console.log(error);
      }
    };
    getSingleUserData();
  }, []);


  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

 

  const addItemsToSubsctiption = async () => {
    try {
      const response = await addNewItemsArrayToOrder({
        id: orderId,
        items: cartItems,
      });

      if (response.status === 200) {
        setMakeOrderSuccess(true);
        toast.success(t("productAddedToSubsciption"), {
          position: "top-right",
          duration: 3500,
        });
      
       dispatch(clearCart());
       router.push('/profile/orders');
      } else if (response.status === 400){
          toast.error(t("productAlreadyInOrder", {name: tPr(response?.data?.productInOrder?.name)}), {
            position: "top-right",
            duration: 3500,
          }); 

      }
    } catch (error) {
      toast.error(t(tOrd("errorOccurred")), {
        position: "top-right",
        duration: 3500,
      });
      console.log(error);
    }

  };


  return (
    <div className="flex flex-col md:flex-row">
      {cartItems.length === 0 && !makeOrderSuccess ? (
        <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg">
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-24 w-24 text-gray-400 mb-4"
            >
              <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
            </svg>
            <p className="text-gray-600 text-lg font-semibold mb-4">
              {t("cartEmpty")}
            </p>
            <Link href="/">
              <button className="px-6 py-2 bg-green-700 text-white rounded-md shadow-md hover:bg-green-800 transition-colors duration-300">
                {t("goShopping")}
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mr-10 mt-4 w-full md:w-3/4">
            <div className="flex-1 ml-0 ms:ml-68">
              <div>
                <h1 className="mb-5 text-2xl font-bold"> {t("cartItems")} </h1>

                <div className="rounded-lg">
                  {cartItems?.map((item: any) => (
                    <div
                      key={item._id}
                      className="justify-between mb-6 border border-gray-200 rounded-lg bg-white p-4 shadow sm:flex sm:justify-start"
                    >
                      <img
                        src={item.files[0]}
                        alt="product-image"
                        className="w-full rounded-lg sm:w-24"
                      />
                      <div className="sm:ml-4 sm:flex items-center w-full justify-between sm:justify-around md:justify-between lg:justify-around xl:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {tPr(item.name)}
                          </h2>
                          <p className="mt-1 text-xl text-gray-700">
                            {item?.description}
                          </p>
                        </div>

                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center justify-end text-gray-400 hover:text-red-500">
                            <button
                              onClick={() =>
                                dispatch(removeItemFromCart(item._id))
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="4.5"
                                stroke="currentColor"
                                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="flex items-center border-gray-100">
                            <button
                              onClick={() =>
                                dispatch(removeItemByQuantity(item._id))
                              }
                              className="cursor-pointer mr-1 rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-700 hover:text-blue-50"
                            >
                              -
                            </button>
                            <input
                              className="h-8 w-14 border bg-white text-center text-xs outline-non border-none sm:text-base md:text-xl lg:text-xl shadow-none	"
                              type="text"
                              value={item.quantity}
                              min="1"
                              disabled
                              onChange={(e) => {
                                console.log(e.target.value);
                              }}
                            />
                            <button
                              onClick={() =>
                                dispatch(
                                  addItemToCart({ ...item, quantity: 1 })
                                )
                              }
                              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 ml-1 duration-100 hover:bg-green-700 hover:text-blue-50"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex justify-end items-center space-x-4">
                            <p className="text-xl">
                              UZS {item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:border-l w-72">
            <div className="flex flex-col">
              {/* <p className="text-zinc-400 ml-6">{t('deliveryMethod')}</p> */}
              <p className="ml-6 mb-7 mt-2 font-extrabold text-xl">
                {t("yourOrder")}
              </p>

              <p className="text-zinc-400 ml-6">{t("userData")}</p>
              <div className="mt-2 ml-6">
                <input
                  defaultValue={userData?.name}
                  placeholder={t("name")}
                  {...register("name", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <span className="text-red-700	text-sm">
                    {t("provideName")}
                  </span>
                )}
              </div>

              <div className="mt-2 ml-6">
                <input
                  type="email"
                  defaultValue={userData?.email}
                  placeholder={t("email")}
                  {...register("email", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="text-red-700	text-sm">
                    {t("provideEmail")}
                  </span>
                )}
              </div>

              <div className="mt-2 ml-6">
                <input
                  defaultValue={userData?.phone}
                  placeholder={t("phone")}
                  {...register("phone", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
                {errors.phone && (
                  <span className="text-red-700	text-sm">
                    {t("providePhone")}
                  </span>
                )}
              </div>

              <button
                className="py-1.5 ml-6 mt-5 block flex justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
                onClick={addItemsToSubsctiption}
              >
                {tFun("addToSubsc")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(SubcriptionCartPage), {
  ssr: false,
});
