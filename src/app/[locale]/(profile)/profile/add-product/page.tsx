"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useForm, Controller, set } from "react-hook-form";
import { addNewProduct, getAllNewlyAddedProducts } from "./request";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tag } from 'antd';
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "next/link";
import { useTranslations } from 'next-intl'




function AddProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllProducts, setGetAllProducts] = useState([] as any);

  const t = useTranslations('Profile')
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
    console.log("show modal", isModalOpen);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await getAllNewlyAddedProducts();
        if (response.status === 200) {
          setGetAllProducts(response?.data?.newProducts);
        } else {
          router.push(`${response.data.redirect}`);
        }
      } catch (error: any) {
        router.push('/server-error')
        toast.error("Error occurred.", {
          position: "top-right",
          duration: 3500,
        });
        console.log(error);
      }
    };
    fetchAllProducts();
  }, []);

  const userData = useSelector((state: any) => state?.userData?.userData);

  const onSubmit = async (data: any) => {
    const response = await addNewProduct({
      user: userData.userId,
      name: data.nameOfProduct,
      category: data.category,
      userLink: data.link,
      description: data.description,
    });
    if (response.status === 200) {
      setIsModalOpen(false);
      reset();
      toast.success("Product request sent successfully", {
        position: "top-right",
        duration: 3500,
      });
    } else {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-col sm:flex-row profile-submenu-main">
        <div>
          <h1 className="text-2xl font-bold mb-4">{t('addYourOwnProduct')}</h1>
        </div>
        <div>
          <button
            onClick={showModal}
            className="bg-black text-white border hover:bg-green-700 font-bold py-2 px-4 rounded-md"
          >
            + {t('addNewProduct')}
          </button>
        </div>

        <Modal
          title={t('addNewProduct')}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={600}
          className="address-modal"
          okButtonProps={{ style: { backgroundColor: "black" } }}
          okText="Save address"
          cancelButtonProps={{ style: { display: "none" } }}
          footer={null}
          maskClosable={false}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:col-span-4 mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t('nameOfProduct')}
              </label>
              <div className="mt-2">
                <input
                  id="nameOfProduct"
                  type="text"
                  autoComplete="nameOfProduct"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  {...register("nameOfProduct", { required: true })}
                />
              </div>
            </div>

            <div className="sm:col-span-4 mb-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                {t('category')}
              </label>

              <Controller
                name="category"
                control={control}
                defaultValue="Other"
                rules={{ required: "Please select category of the product" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  >
                    <option value="cookies">{t('snacks')}</option>
                    <option value="beverages">{t('beverages')}</option>
                    <option value="hygiene">{t('hygiene')}</option>
                    <option value="stationary">{t('stationary')}</option>
                    <option value="coffee">{t('coffee')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                )}
              />
            </div>

            <div className="sm:col-span-4 mb-5">
              <label
                htmlFor="link"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t('linktoProduct')}
              </label>
              <div className="mt-2">
                <input
                  id="link"
                  type="text"
                  autoComplete="link"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  {...register("link", { required: false })}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t('description')}
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", { required: false })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {t('extraDescription')}
              </p>
            </div>

            <button
              className="mx-auto mt-7 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              {t('submit')}
            </button>
          </form>
        </Modal>
      </div>

      <h1 className="mt-5 text-lg	mb-4">
        {t('statusOfYourProduct')}
      </h1>


{getAllProducts?.map((product: any) => (
    <div key={product._id} className={`w-full flex justify-between rounded-lg border border-gray-300 shadow-md mb-5 items-center py-4 px-4 text-sm leading-tight ${product.link ? 'hover:text-green-700' : 'hover:text-gray-500'}`}>
       <div className="w-44">{product?.name}</div> 
        <Tag color={product?.status == "processing" ? '#159bfa' : product?.status == "pending" ? '#facc15' : product?.status == "added" ? '#15803d' : '#b91c1c'}>
            {product?.status}
        </Tag>
        <div className="w-30 flex justify-end">
        {product.ourLink ? (
            <Link href={product.ourLink}>
                <HiOutlineExternalLink className="hover:cursor-pointer text-lg"/>
            </Link>
        ) : (
            <div className="text-m">{t('underProcess')}</div>
        )}
        </div>
    </div>
))}

    </div>
  );
}

export default AddProductPage;
