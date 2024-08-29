"use client";
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../request";
import ListOfProducts from "../../../components/ListOfProducts";
import { useTranslations } from "next-intl";

import { Select, Input } from "antd";



type Products = {
  _id: string;
  name: string;
  price: number;
  category: string;
  extraInfo: string;
  imageUrl: string;
  imageAlt: string;
  unitOfMeasure: string;
  id: string;
  files: string[];
}[];


const CookiesPage: React.FC = () => {
  const [cookiesProducts, setCookiesProduct] = useState([]);
  const [filteredProductAll, setFilteredProductsAll] = useState<Products>([]);

  const t = useTranslations("Products");
  const funcT = useTranslations("Functions");

  // useEffect(() => {
  //   const getAllCookies = async () => {
  //     const response = await getAllProducts();
  //     setCookiesProduct(response?.data?.products);
  //   };
  //   getAllCookies();
  // }, []);

  // const filteredProducts = cookiesProducts?.filter(
  //   (product: any) => product.category === "cookie"
  // );

  useEffect(() => {
    const getAllCookie = async () => {
      const response = await getAllProducts();
      setCookiesProduct(response?.data?.products.filter((product: any) => product.category === "cookie"));
    };
    getAllCookie();
  }, []);


  useEffect(() => {
    setFilteredProductsAll(
      cookiesProducts?.filter((product: any) => product.category === "cookie")
    );
  }, [cookiesProducts]);


  const handleSelectCookie = (value: string) => {
    if (value === "all") {
      setFilteredProductsAll(
        cookiesProducts?.filter((product: any) => product.category === "cookie")
      );
      return;
    }
    setFilteredProductsAll(
      cookiesProducts?.filter((product: any) => product.extraInfo[0] === value)
    );
  };


  const { Search } = Input;


  const handleSearch = (e: any) => {
    const searchInput = e.target.value.toLowerCase();

    if (searchInput === "") {
      setFilteredProductsAll(
        cookiesProducts?.filter((product: any) => product.category === "cookie")
      );
      return;
    }

    const newSorted = cookiesProducts?.filter((product: any) =>
      t(product.name).toLocaleLowerCase().includes(searchInput)
    );

    setFilteredProductsAll(newSorted);
  };



  return (
    <div>
      <h1 className="w-full mt-6 flex justify-center text-3xl">
        {funcT("snacks")}
      </h1>

      <div className="search-select mt-6 w-full flex justify-center">
        <div className="select">
          <Select
            defaultValue="all"
            style={{ width: 180 }}
            onChange={handleSelectCookie}
            options={[
              { value: "all", label: funcT("all") },
              { value: "waffle", label: funcT("waffle") },
              { value: "oreo", label: funcT("oreo") },
              { value: "cheeseBall", label: funcT("cheeseBall") },
              { value: "gingerBread", label: funcT("gingerBread") },
              { value: "biscuit", label: funcT("biscuit") },
              { value: "nuts", label: funcT("nuts") },
              { value: "meatWeight", label: funcT("meatWeight")}
              
            ]}
          />
        </div>

        <div className="search ml-2 w-96">
          <Search
            placeholder={funcT("searchProduct")}
            loading={false}
            // enterButton
            onChange={handleSearch}
          />
        </div>
      </div>


      <div className="bg-white">
        <div className=" max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-2">
          <h2 className="sr-only">Products</h2>

          {cookiesProducts?.length ? (
            <ListOfProducts products={filteredProductAll} />
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              <div className=" animate-pulse gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <div className="mb-8">
                  <div className="">
                    <svg
                      className="rounded-md	text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>

                  <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-4"></div>
                </div>
              </div>

              <div className="animate-pulse gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <div className="mb-8">
                  <div className="">
                    <svg
                      className="rounded-md	text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>

                  <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-4"></div>
                </div>
              </div>

              <div className=" animate-pulse gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <div className="mb-8">
                  <div className="">
                    <svg
                      className="rounded-md	text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>

                  <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-4"></div>
                </div>
              </div>

              <div className="animate-pulse gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <div className="mb-8">
                  <div className="">
                    <svg
                      className="rounded-md	text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>

                  <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-4"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;
