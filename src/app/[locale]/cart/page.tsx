"use client";
import React, { useState, useLayoutEffect, useEffect, use } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  removeItemByQuantity,
} from "../../../reduxStore/feature/cartSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { getAllDeliveryLocation } from "../(profile)/profile/delivery-location/request";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Select, DatePicker, Modal } from "antd";
import moment from "moment";
import { makeOrder } from "./request";
import { addDeliveryLocation } from "../(profile)/profile/delivery-location/request";
import { isLoggedIn, getUserOrders } from "../(profile)/profile/orders/request";

import {useTranslations} from 'next-intl';

import { useForm, Controller } from "react-hook-form";
import { getSingleUser } from "./request";

interface IFormValues {
  title: string;
  street: string;
  building: string;
  office: string;
  postcode: string;
  country: string;
  city: string;
  extraInfo: string;
}

const CartPage: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [deliveryLocationNotSelected, setDeliveryLocationNotSelected] =
    useState<string>("");
  const [deliveryLocationsApi, setDeliveryLocationsApi] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [makeOrderSuccess, setMakeOrderSuccess] = useState(false);


  const t = useTranslations('Checkout');
  const tAd = useTranslations('Address');
  const tPr = useTranslations('Products');

  const router = useRouter();


  useLayoutEffect(() => {
    const checkLoggedInAndIfOrderExists = async () => {
      const response = await isLoggedIn();
      
      if(response.data.isLoggedIn){
        const response = await getUserOrders();
        if(response?.data?.orders[0]?.orderItems.length>0) {  
          router.push(`/subscription-cart`);
        } 
      }

    }

    checkLoggedInAndIfOrderExists();
  }, []);

  useLayoutEffect(() => {
    const getAllDeliveryLocations = async () => {
      try {
        const response = await getAllDeliveryLocation();
        if (response.status === 200) {
          setDeliveryLocationsApi(response?.data);
        } else {
          router.push(`${response?.data?.redirect}`);
        }
      } catch (error) {
        router.push(`/server-error`);
        toast.error("Error occurred", {
          position: "top-right",
          duration: 3500,
        });
        console.log("here is the code", error);
      }
    };
    getAllDeliveryLocations();
  }, []);




  const handleSelectedDeliveryLocation = (id: string) => {
    const selectedAddressById = deliveryLocationsApi?.find(
      (item: any) => item._id === id
    );
    setSelectedAddress(selectedAddressById);
    setDeliveryLocationNotSelected("");
  };

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
          router.push(`${response?.data?.redirect}`);
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

  const totalProductPrice = cartItems?.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );

  const isServiceFee = cartItems?.find((item: any) => item.isServiceFee) ?? 0;

  const totalPrice = totalProductPrice + isServiceFee;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  
  const onSubmit = (data: any) => {
    if (!selectedAddress) {
      toast.error(t("selectDeliveryAddress"), {
        position: "top-right",
        duration: 2000,
      });
      setDeliveryLocationNotSelected(t('selectDeliveryAddress'));
      return;
    }
    setLoading(true);

    const date = new Date(data.startDate);

    const makeOrderRequest = async () => {
      try {
        const response = await makeOrder({
          ...data,
          user: userData?.userId,
          startDeliveryDate: date.setDate(date.getDate()),
          shippingAddress: selectedAddress,
          orderItems: [
            ...cartItems.map((item: any) => ({
              product: item._id,
              amount: item.quantity,
            })),
          ],
          totalAmount: totalPrice.toLocaleString(),
        });
        if (response?.status === 200) {
          setLoading(false);
          toast.success(t("orderSuccess"), {
            position: "top-right",
            duration: 2500,
          });
          setMakeOrderSuccess(true);
          router.push("/confirm-order");

          router.refresh();
          dispatch(clearCart());
        } else if (response?.code === "ERR_NETWORK") {
          setLoading(false);
          toast.error("Server Error", {
            position: "top-right",
            duration: 2500,
          });
        } else {
          setLoading(false);
          console.log(response?.response.data.message);
          toast.error(response?.response.data.message, {
            position: "top-right",
            duration: 3500,
          });
        }
      } catch (error) {
        setLoading(false);
        toast.error("Error occurred.", {
          position: "top-right",
          duration: 3500,
        });
        console.log(error);
      }
    };
    makeOrderRequest();

    reset();
  };

  const applyPromoCode = () => {
    toast.error(t("inValidPromo"), {
      position: "top-right",
      duration: 2000,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
                <h1 className="mb-5 text-2xl font-bold"> {t('cartItems')} </h1>

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

              <div className="deliveryLocation">
                <>
                  <div className="flex justify-between">
                    <p className="text-2xl font-bold	">
                      {t('chooseDeliveryAddress')}
                    </p>

                    <button
                      onClick={showModal}
                      className="rounded-md bg-green-700 py-2 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 ">
                      + {t('addNewAddress')} 
                    </button>
                  </div>
                  <div>
                    <Modal
                      title="Add new address"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      width={1200}
                      className="address-modal"
                      okButtonProps={{ style: { backgroundColor: "black" } }}
                      okText="Save address"
                      cancelButtonProps={{ style: { display: "none" } }}
                      footer={null}
                      maskClosable={false}
                    >
                      <Formik
                        initialValues={{
                          title: "",
                          street: "",
                          building: "",
                          office: "",
                          postcode: "",
                          country: "",
                          city: "",
                          extraInfo: "",
                        }}
                        validate={(values) => {
                          const errors: Partial<IFormValues> = {};
                          if (!values.title) {
                            errors.title = tAd('required');
                          }
                          if (!values.street) {
                            errors.street = tAd('required');
                          }
                          if (!values.building) {
                            errors.building = tAd('required');
                          }
                          if (!values.office) {
                            errors.office = tAd('required');
                          }
                          if (!values.postcode) {
                            errors.postcode = tAd('required');
                          }
                          if (!values.country) {
                            errors.country = tAd('required');
                          }
                          if (!values.city) {
                            errors.city = tAd('required');
                          }
                          return errors;
                        }}
                        onSubmit={async (values) => {
                          setLoadingAddress(true);
                          try {
                            const response = await addDeliveryLocation(values);
                            if (response.status === 200) {
                              toast.success("Address saved", {
                                position: "top-right",
                                duration: 3500,
                              });
                              setLoadingAddress(false);
                              setIsModalOpen(false);

                              values.title = "";
                              values.street = "";
                              values.building = "";
                              values.office = "";
                              values.postcode = "";
                              values.country = "";
                              values.city = "";
                              values.extraInfo = "";
                              handleOk();
                              window.location.reload();
                            } else {
                              router.push(`${response.data.redirect}`);
                            }
                          } catch (error) {
                            toast.error("Error occurred 1", {
                              position: "top-right",
                              duration: 3500,
                            });
                            console.log(error);
                            setLoadingAddress(false);
                          }
                        }}
                        enableReinitialize={true}
                      >
                        <Form>
                          <div className="space-y-12">
                            <div className="border-gray-900/10 pb-12">
                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {tAd('title')}
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="title"
                                      id="title"
                                      autoComplete="title"
                                      required
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage
                                      name="title"
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                  <label
                                    htmlFor="street"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {tAd('street')}
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="street"
                                      id="street"
                                      autoComplete="street"
                                      required
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage
                                      name="street"
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="building"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {tAd('building')}
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="building"
                                      id="building"
                                      autoComplete="building"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage
                                      name="building"
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="office"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {tAd('apartmentOffice')}
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="office"
                                      id="office"
                                      autoComplete="office"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage
                                      name="office"
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                  <label
                                    htmlFor="postcode"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {tAd('postcode')}
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="postcode"
                                      id="postcode"
                                      autoComplete="address-level2"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage
                                      name="postcode"
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {tAd('country')}
                                  </label>
                                  <div className="mt-2">
                                    <div className="mt-2">
                                      <Field
                                        as="select"
                                        id="country"
                                        name="country"
                                        autoComplete="country"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:max-w-xs sm:text-sm sm:leading-6"
                                      >
                                        <option>{tAd('selectCountry')}</option>
                                        <option value="Uzbekistan">
                                          {tAd('uzbekistan')}
                                        </option>
                                        {/* <option value="Kazakhstan">
                                          Kazakhstan
                                        </option>
                                        <option value="Kyrgyzstan">
                                          Kyrgyzstan
                                        </option>
                                        <option value="Turkmenistan">
                                          Turkmenistan
                                        </option>
                                        <option value="Tajikistan">
                                          Tajikistan
                                        </option> */}
                                      </Field>
                                      <ErrorMessage
                                        name="country"
                                        component="div"
                                        className="text-red-500"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {tAd('city')}
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="city"
                                      id="city"
                                      required
                                      autoComplete="city"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage
                                      name="country"
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="extraInfo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {tAd('additionalInfo')}
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      component="textarea"
                                      id="extraInfo"
                                      name="extraInfo"
                                      rows={3}
                                      autoComplete="extraInfo"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              {tAd("save")}
                            </button>
                          </div>
                        </Form>
                      </Formik>
                    </Modal>
                  </div>

                  {deliveryLocationNotSelected && (
                    <div className="text-red-500 mt-2">
                      {deliveryLocationNotSelected}
                    </div>
                  )}
                  <div className="flex flex-col mt-5">
                    {deliveryLocationsApi?.map((item: any) => (
                      <div
                        key={item._id}
                        className={`hover:cursor-pointer block max-w mb-5 p-6 bg-white border rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                          selectedAddress?._id === item._id
                            ? "border-green-700 border-2"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => handleSelectedDeliveryLocation(item._id)}
                      >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.title}
                        </h5>
                        <div className="font-normal text-gray-700 dark:text-gray-400">
                          {item.street} {item.building} {item.office}{" "}
                          {item.postcode}
                          {item.country} {item.city}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              </div>
            </div>
          </div>

          <div className=" md:border-l">
            <div className="flex flex-col">
              <p className="text-zinc-400 ml-6">{t('deliveryMethod')}</p>
              <p className="ml-6 mb-7 mt-2 font-extrabold text-xl">
                {t('yourOrder')}
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <p className="text-zinc-400 ml-6">{t('userData')}</p>
                <div className="mt-2 ml-6">
                  <input
                    defaultValue={userData?.name}
                    placeholder={t('name')}
                    {...register("name", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                  {errors.name && (
                    <span className="text-red-700	text-sm">
                        {t('provideName')}
                    </span>
                  )}
                </div>

                <div className="mt-2 ml-6">
                  <input
                    type="email"
                    defaultValue={userData?.email}
                    placeholder={t('email')}
                    {...register("email", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <span className="text-red-700	text-sm">
                      {t('provideEmail')}
                    </span>
                  )}
                </div>

                <div className="mt-2 ml-6">
                  <input
                    defaultValue={userData?.phone}
                    placeholder={t('phone')}
                    {...register("phone", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                  {errors.phone && (
                    <span className="text-red-700	text-sm">
                      {t('providePhone')}
                    </span>
                  )}
                </div>

                <div className="mt-8 col-span-full ml-6 flex flex-col">
                  <label className="text-sm leading-6 text-zinc-400">
                    {t('deliveryOptions')}
                  </label>

                  <Controller
                    name="deliveryOption"
                    control={control}
                    rules={{ required: "Please select a delivery option" }}
                    render={({ field }) => (
                      <Select {...field} className="block w-full">
                        <Select.Option value={1}>
                          {t('onceAweek')}
                        </Select.Option>
                        <Select.Option value={2}>
                          {t('onceInTwoWeeks')}
                        </Select.Option>
                        <Select.Option value={3}>
                          {t('onceInMonth')}
                        </Select.Option>
                        <Select.Option value={4}>
                          {t('onceInTwoMonths')}
                        </Select.Option>
                        <Select.Option value={5}>
                          {t('onceInThreeMonths')}
                        </Select.Option>
                        <Select.Option value={6}>
                          {t('onceInSixMonths')}
                        </Select.Option>
                      </Select>
                    )}
                  />

                  {errors.deliveryOption && (
                    <span className="text-red-700 text-sm">
                      {t('provideDeliveryOption')}
                    </span>
                  )}
                </div>

                <div className="col-span-full ml-6 flex flex-col">
                  <label className="text-sm leading-6 text-zinc-400">
                    {t('startDate')}
                  </label>

                  <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: "Please select start date" }}
                    render={({ field }) => (
                      <DatePicker
                        format={"DD-MM-YYYY"}
                        {...field}
                        className="block w-full"
                        disabledDate={(current) => {
                           return current && current < moment().add(1, 'days');
                        }}
                      />
                    )}
                  />

                  {errors.deliveryOption && (
                    <span className="text-red-700 text-sm">
                      {t('provideStartDate')}
                    </span>
                  )}
                </div>

                <div className="mt-8 col-span-full ml-6">
                  <label className="text-sm leading-6 text-zinc-400">
                    {t('promoCode')}
                  </label>
                  <input
                    placeholder="Promo Code"
                    {...register("promoCode", { required: false })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                  <div>
                    <div
                      onClick={applyPromoCode}
                      className="text-green-700 font-semibold mt-2 cursor-pointer"
                    >
                      {t('apply')}
                    </div>
                  </div>
                </div>

                {/* <div className="flex coll-span-full justify-between ml-6 text-zinc-600 space-between w-11/12 mt-5">
                  <p> {t('serviceFee')}</p>
                  <p>UZS {isServiceFee}</p>
                </div> */}

                <div className="flex text-xl w-5/6 justify-between ml-6 text-zinc-600 space-between w-11/12">
                  <p> {t('totalFee')} </p>
                  <p>UZS <span className="font-bold">
                  {totalPrice.toLocaleString()}
                    </span></p>
                </div>

                <div className="relative flex gap-x-3 mt-4 ml-6">
                  <div className="flex h-6 items-center">
                    <input
                      type="checkbox"
                      {...register("termAndCondition", { required: true })}
                      className="py-1.5 h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-700"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <p className="text-gray-500 w-5/6">
                      {t('agreeWith')}{" "}
                      <Link
                        className="text-green-700 font-semibold"
                        href="/terms"
                        target="_blank"
                      >
                        {" "}
                        {t('termsAndConditions')}
                      </Link>
                    </p>

                    {errors.termAndCondition && (
                      <span className="text-red-700	text-sm">
                        {t('pleaseConfirm')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="mx-auto mt-7 flex w-5/6 justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                >
                  {t('submit')}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
