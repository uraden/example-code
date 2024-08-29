"use client";
import React, { useState, useEffect } from "react";
import { Modal, Popconfirm } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  addDeliveryLocation,
  getAllDeliveryLocation,
  deleteDeliveryLocation,
  updateDeliveryLocation,
  getSingleDeliveryLocation
} from "./request";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {useTranslations} from 'next-intl';


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

export default function DeliveryLocation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryLocations, setDeliveryLocations] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({} as any);


  const t = useTranslations('Address');

  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };

  useEffect(() => {
    const getAllDeliveryLocations = async () => {
      try {
        const response = await getAllDeliveryLocation();
        if (response.status === 200) {
          setDeliveryLocations(response.data);
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
    getAllDeliveryLocations();
  }, []);

  const confirmDeleteAddress = async (itemId: any) => {
    try {
      const response = await deleteDeliveryLocation(itemId);

      if (response && response.status === 200) {
        console.log(itemId);
        toast.success("Address deleted successfully", {
          position: "top-right",
          duration: 2000,
        });
        window.location.reload();
      } else {
        toast.error("Failed to delete address", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      router.push(`/server-error`);
      console.error("Error deleting address:", error);
      toast.error("Error deleting address", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const cancelDeleteAddress = (e: any) => {
    console.log(e);
  };

  const editAddress = async (values: any) => {
    setIsModalOpen(true);
    const data = {
      id: selectedAddress._id,
      title: values.title,
      street: values.street,
      building: values.building,
      office: values.office,
      postcode: values.postcode,
      country: values.country,
      city: values.city,
      extraInfo: values.extraInfo,
    }
    try {
      const response = await updateDeliveryLocation(data);
      if (response.status === 200) {
        toast.success("Address updated successfully", {
          position: "top-right",
          duration: 500,
        });
        return response;
      } else {
        router.push(`${response.data.redirect}`);
      }
    } catch (error) {
      router.push(`/server-error`);
      console.error("Error updating address:", error);
      toast.error(t("errorUpdatingAddress"), {
        position: "top-right",
        duration: 2000,
      });
    }

  }

  const getSingleAddress = async (id: string) => {
    try {
      const response = await getSingleDeliveryLocation({"id": id});
      if (response.status === 200) {
        setSelectedAddress(response.data);
        setIsModalOpen(true);
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

  return (
    <div>
      <div className="flex justify-between items-center flex-col sm:flex-row profile-submenu-main">
        <div>
          <h1 className="text-2xl font-bold">{t('deliveryAddress')}</h1>
        </div>
        <div>
          <button
            onClick={showModal}
            className="bg-black text-white border hover:bg-green-700 font-bold py-2 px-4 rounded-md"
          >
            + {t('addNewAddress')}
          </button>
        </div>
      </div>
      <div className="mt-3">
        {deliveryLocations.map((item: any, index: number) => (
          <div key={index} className="mt-5">
            <div className="w-full mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {item.title}
                </h5>

                <p className="mb-3 font-normal text-gray-500">
                  {item.street} {item.building} {item.office} {item.postcode}{" "}
                  {item.country} {item.city}
                </p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => getSingleAddress(item._id)}
                  className="flex items-center justify-center px-2 py-1 mr-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-black border border-transparent rounded-md active:bg-green-700 hover:bg-green-700 focus:outline-none focus:shadow-outline-gray">
                  {t('edit')}
                </button>
                <Popconfirm
                  title={t("deleteAddress")}
                  description={t("sureDeleteAddress")}
                  onConfirm={() => confirmDeleteAddress(item._id)}
                  onCancel={cancelDeleteAddress}
                  okText={t("yes")}
                  cancelText={t("no")}
                  okButtonProps={{ style: { backgroundColor: "black" } }}
                >
                  <button className="flex items-center justify-center px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-black border border-transparent rounded-md active:bg-red-700 hover:bg-red-700 focus:outline-none focus:shadow-outline-gray">
                    {t('delete')}
                  </button>
                </Popconfirm>
              </div>
            </div>
            <div className="modal-div">
            

            </div>
          </div>
        ))}

          <Modal
              title= {selectedAddress ? t("editAddress") : t("addNewAddress")} 
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
                title: selectedAddress?.title || "",
                street: selectedAddress?.street || "",
                building: selectedAddress?.building || "",
                office: selectedAddress?.office || "",
                postcode: selectedAddress?.postcode || "",
                country: selectedAddress?.country || "",
                city: selectedAddress?.city || "",
                extraInfo: selectedAddress?.extraInfo || "",
              }}
              validate={(values) => {
                const errors: Partial<IFormValues> = {};
                if (!values.title) {
                  errors.title = "Required";
                }
                if (!values.street) {
                  errors.street = "Required";
                }
                if (!values.building) {
                  errors.building = "Required";
                }
                if (!values.office) {
                  errors.office = "Required";
                }
                if (!values.postcode) {
                  errors.postcode = "Required";
                }
                if (!values.country) {
                  errors.country = "Required";
                }
                if (!values.city) {
                  errors.city = "Required";
                }
                return errors;
              }}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  if(selectedAddress?._id) {
                    
                    const newEditAddress = {
                      id: selectedAddress._id,
                      title: values.title,
                      street: values.street,
                      building: values.building,
                      office: values.office,
                      postcode: values.postcode,
                      country: values.country,
                      city: values.city,
                      extraInfo: values.extraInfo,
                    }
            
                    editAddress(newEditAddress);
                    setIsModalOpen(false);

                  } else {
                    const response = await addDeliveryLocation(values);
                    if (response.status === 200) {
                    toast.success("Address saved", {
                      position: "top-right",
                      duration: 3500,
                    });
                    setLoading(false);
                    setIsModalOpen(false);
                    setLoading(false);
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
                  }
                  
                } catch (error) {
                  toast.error("Error occurred 1", {
                    position: "top-right",
                    duration: 3500,
                  });
                  console.log(error);
                  setLoading(false);
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
                          {t('title')}
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
                          {t('street')}
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
                          {t('building')}
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
                          {t('apartmentOffice')}
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
                          {t('postcode')}
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
                          {t('country')}
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
                              <option>{t("selectCountry")}</option>
                              <option value="Uzbekistan" key="uz">{t("uzbekistan")}</option>
                              {/* <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Tajikistan">Tajikistan</option> */}
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
                          {t('city')}
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
                          {t('additionalInfo')}
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
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white hover:text-black border border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t('save')}
                  </button>
                </div>
              </Form>
            </Formik>
          </Modal>
      </div>
    </div>
  );
}
