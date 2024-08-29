"use client";
import React, { use, useEffect, useState } from "react";
import { getProductById } from "../app/[locale]/request";
import { usePathname } from "next/navigation";
import { getAllProducts } from "../app/[locale]/request";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { addItemToCart } from "../reduxStore/feature/cartSlice";
import ProductNotFound from "./ProductNotFound";
import { useTranslations } from "next-intl";
import {
  getUserOrders,
  isLoggedIn,
} from "@/app/[locale]/(profile)/profile/orders/request";
import { toast } from "sonner";
import { addProductToOrder } from "../app/[locale]/request";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Product {
  _id: any;
  id: string | number;
  name: string;
  href: string;
  price: string;
  files: string[];
  description: string;
  unitOfMeasure: string;
  extraInfo: string;
}

const SingleProduct: React.FC = () => {
  const [singleProduct, setSingleProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [disableAddToCart, setDisableAddToCart] = useState<boolean>(false);
  const [orderId, setOrderId] = useState("");
  const [itemInOrder, setItemInOrder] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();

  const t = useTranslations("Products");
  const funcT = useTranslations("Functions");

  const productId = usePathname().split("/")[usePathname().split("/").length - 1];

  const getSingleProduct = async () => {
    setLoading(true);
    const response = await getProductById(productId);
    setSingleProduct(response?.data?.product);
    setLoading(false);
  };

  const checkLoggedInAndIfOrderExists = async () => {
    const response = await isLoggedIn();

    if (response.data.isLoggedIn) {
      const response = await getUserOrders();
      if (response.data.orders.length) {
        setOrderId(response.data.orders[0]._id);
        setItemInOrder(response.data.orders[0].orderItems);
      }
    }
  };

  useEffect(() => {
    getSingleProduct();
    checkLoggedInAndIfOrderExists();
  }, []);

  const addItemToOrderAndCart = async (product: any) => {
    const { _id: productId, quantity: amount, price, files, name } = product;
    if (itemInOrder.length) {
      const productExist = itemInOrder.find(
        (item: any) => item.product === productId
      );

      if (productExist) {
        toast.info(funcT("productAlreadyInYourSubscriptionOrder"), {
          position: "top-right",
          duration: 2000,
        });
        return;
      }
      try {
        const response = await addProductToOrder({
          productId,
          amount: productQuantity,
          price,
          files,
          name,
          id: orderId,
        });

        if (response.status === 200) {
          setDisableAddToCart(true);
          toast.success(funcT("productAddedToYourSubscriptionOrder"), {
            position: "top-right",
            duration: 2000,
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    } else {
      dispatch(
        addItemToCart({
          ...product,
          quantity: productQuantity,
        })
      );
      setDisableAddToCart(true);
    }
  };

  const pathName = usePathname().split("/")[usePathname().split("/").length - 2];
 
  useEffect(() => {
    const getSimilarProducts = async () => {
      const response = await getAllProducts();

      setProducts(
        response?.data?.products.filter(
          (product: any) => product.category === pathName && product._id !== productId 
        )
      );
    };
    getSimilarProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-black animate-spin absolute top-1/2 right-1/2"></div>
      ) : (
        <>
          {singleProduct ? (
            <div>
              <section className="overflow-hidden bg-white py-11 font-poppins">
                <div className="max-w-6xl px-4 py-4 lg:py-8 md:px-6">
                  <div className="flex flex-wrap -mx-4">
                    <div
                      className="w-full px-4 md:w-1/2 rounded-lg shadow-md"
                      style={{ height: "550px" }}
                    >
                      <div className="sticky top-0 z-1 overflow-hidden ">
                        <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                          <img
                            src={singleProduct?.files[0]}
                            alt=""
                            className="object-cover w-full lg:h-full"
                            style={{ width: "350px", margin: "auto" }}
                          />
                        </div>
                        {/* <div className="flex-wrap hidden md:flex ">
                                <div className="w-1/2 p-2 sm:w-1/4">
                                    <a href="#"
                                        className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                        <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" alt=""
                                            className="object-cover w-full lg:h-20" />
                                    </a>
                                </div>
                                <div className="w-1/2 p-2 sm:w-1/4">
                                    <a href="#"
                                        className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                        <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                            className="object-cover w-full lg:h-20" />
                                    </a>
                                </div>
                                <div className="w-1/2 p-2 sm:w-1/4">
                                    <a href="#"
                                        className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                        <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                            className="object-cover w-full lg:h-20" />
                                    </a>
                                </div>
                                <div className="w-1/2 p-2 sm:w-1/4">
                                    <a href="#"
                                        className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                        <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                            className="object-cover w-full lg:h-20" />
                                    </a>
                                </div>
                            </div> */}
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2 ">
                      <div className="lg:pl-20">
                        <div className="mb-8 ">
                          {/* <span className="text-lg font-medium text-rose-500 dark:text-rose-200">New</span> */}
                          <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold md:text-4xl">
                            {t(singleProduct?.name)}
                            <span className="ml-2 text-gray-500 text-2xl">
                              {singleProduct.unitOfMeasure}{" "}
                              {t(singleProduct.extraInfo[0])}{" "}
                            </span>
                          </h2>
                          {/* <div className="flex items-center mb-6">
                                    <ul className="flex mr-2">
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
                                </div> */}
                          <p className="max-w-md mb-8 text-gray-700">
                            {t(singleProduct?.description)}
                          </p>
                          <p className="inline-block mb-8 text-4xl font-bold text-gray-700  ">
                            UZS{" "}
                            <span>{singleProduct?.price.toLocaleString()}</span>
                          </p>
                          <p className="text-green-600">60 {t("inStock")}</p>
                        </div>
                        {/* <div className="flex items-center mb-8">
                                <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                                    Colors:</h2>
                                <div className="flex flex-wrap -mx-2 -mb-2">
                                    <button
                                        className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                                        <div className="w-6 h-6 bg-cyan-300"></div>
                                    </button>
                                    <button
                                        className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                        <div className="w-6 h-6 bg-green-300 "></div>
                                    </button>
                                    <button
                                        className="p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                        <div className="w-6 h-6 bg-red-200 "></div>
                                    </button>
                                </div>
                            </div> */}
                        {/* <div className="flex items-center mb-8">
                                <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                                    Size:</h2>
                                <div className="flex flex-wrap -mx-2 -mb-2">
                                    <button
                                        className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL
                                    </button>
                                    <button
                                        className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">S
                                    </button>
                                    <button
                                        className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">M
                                    </button>
                                    <button
                                        className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">XS
                                    </button>
                                </div>
                            </div> */}

                        {/* <div className="flex items-center border-gray-100 my-5">
                    <button
                      //   onClick={() =>
                      //     console.log('This is subtraction')
                      //     // dispatch(removeItemByQuantity(item._id))
                      //   }
                      className="cursor-pointer mr-1 rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-700 hover:text-blue-50"
                    >
                      -
                    </button>
                    <input
                      className="h-8 w-10 border bg-white text-center text-xs outline-non border-none sm:text-base md:text-xl lg:text-2xl xl:text-3xl shadow-none	"
                      type="text"
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                      //   value={item.quantity}
                      value={1}
                      min="1"
                      //   onChange={(e) =>{
                      //     console.log(e.target.value);
                      //   }}
                    />
                    <button
                      //   onClick={() =>
                      //     // dispatch(addItemToCart(item))
                      //     console.log('This is addition')
                      // }
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 ml-1 duration-100 hover:bg-green-700 hover:text-blue-50"
                    >
                      +
                    </button>
                  </div> */}

                        <div className="flex items-center border-gray-100 my-5">
                          <button
                            onClick={() =>
                              setProductQuantity(
                                productQuantity - 1 <= 0
                                  ? 1
                                  : productQuantity - 1
                              )
                            }
                            className={`cursor-pointer mr-1 rounded-l bg-gray-100 py-1 px-3.5 duration-100 ${
                              productQuantity < 2
                                ? ""
                                : "hover:bg-green-700 hover:text-blue-50"
                            }`}
                          >
                            -
                          </button>
                          <input
                            className="h-8 w-14 border bg-white text-center text-xs outline-non border-none sm:text-base md:text-xl lg:text-xl shadow-none	"
                            type="text"
                            value={productQuantity}
                            min="1"
                            onChange={(e) => {
                              setProductQuantity(Number(e.target.value));
                            }}
                          />
                          <button
                            onClick={() =>
                              setProductQuantity(productQuantity + 1)
                            }
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 ml-1 duration-100 hover:bg-green-700 hover:text-blue-50"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center -mx-4 ">
                          <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                            <button
                              disabled={disableAddToCart}
                              onClick={() =>
                                addItemToOrderAndCart(singleProduct)
                              }
                              className={`${
                                !disableAddToCart
                                  ? "flex items-center justify-center detail-add-btn w-52 p-1 text-green-700 border border-green-700 rounded-md  hover:bg-green-800 hover:border-green-800 hover:text-gray-100"
                                  : "bg-gray-300 px-4 py-2 detail-add-btn w-52 rounded-md cursor-not-allowed opacity-50"
                              }`}
                            >
                              {itemInOrder.length
                                ? funcT("addToSubsc")
                                : funcT("addToCart")}
                            </button>
                          </div>
                          {/* <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                                    <button
                                        className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                                        Add to wishlist
                                    </button>
                                </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div>
                <h2 className="mb-6 text-xl">
                  {t('similarProducts')}
                </h2>

                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={30}
                  // slidesPerView={4}
                  navigation={true}
                  className="mb-20"
                  breakpoints={{
                    240: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 50,
                    },
                  }}
                >

                  {products.map((product) => {
                    return (
                      <SwiperSlide key={product._id} className="mb-4">
                        <div className="hover:shadow-md p-2 rounded-xl">
                          <Link href={`/${pathName}/${product._id}`}>
                            <div className="group relative flex flex-col justify-between h-[20rem] lg:h-[26rem]">
                              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                  src={product.files[0]}
                                  alt="image"
                                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                              </div>
                              <div className="mt-6">
                                <div className="text-gray-500">
                                  {t(product.name)}
                                </div>
                                <div className="flex justify-between mt-6">
                                  <div>
                                    UZS {product.price.toLocaleString()}
                                  </div>
                                  <button
                                    className="border rounded-full box-border h-8 p-[3.5px] w-8 hover:bg-[#adaeaf] border-[#89898b]"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      addItemToOrderAndCart(product);
                                    }}
                                  >
                                    <svg
                                      data-v-40da8b10=""
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="ui-icon  add-cart-icon"
                                    >
                                      <path
                                        d="M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z"
                                        fill="black"
                                      ></path>
                                      <path
                                        d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17H10.5C10.7761 17 11 17.2239 11 17.5C11 17.7761 10.7761 18 10.5 18H8V20.5C8 20.7761 7.77614 21 7.5 21C7.22386 21 7 20.7761 7 20.5V18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H7V14.5C7 14.2239 7.22386 14 7.5 14Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          ) : (
            <ProductNotFound />
          )}
        </>
      )}
    </div>
  );
};

export default SingleProduct;
