"use client";
import React, { useState, useEffect, use } from "react";
import LayoutAuth from "../layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import { requestLogin } from "./request";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { saveUserData } from "../../../../reduxStore/feature/saveUserDataSlice";
import { useTranslations } from "next-intl";

interface ILogin {
  email?: string;
  password?: string;
}

interface ILoginResponse {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
  status: number;
  code: unknown;
  data: {
    user: {
      name: string;
      userId: string;
      role: string;
    };
    accessTokenJWT: string;
    refreshTokenJWT: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
  };
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const t = useTranslations("Login");

  return (
    <LayoutAuth>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors: ILogin = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          setLoading(true);
          const response = (await requestLogin(values)) as ILoginResponse;
          if (response.status === 200) {
            const {
              accessTokenJWT,
              refreshTokenJWT,
              accessTokenExpiresAt,
              refreshTokenExpiresAt,
            } = response.data;

            localStorage.setItem("accessToken", accessTokenJWT);
            localStorage.setItem("refreshToken", refreshTokenJWT);
            localStorage.setItem("accessTokenExpiresAt", accessTokenExpiresAt);
            localStorage.setItem(
              "refreshTokenExpiresAt",
              refreshTokenExpiresAt
            );

            setLoading(false);
            toast.success(t("signedSuccessfully"), {
              position: "top-right",
              duration: 2500,
            });

            router.push("/");

            dispatch(saveUserData(response.data.user));
            router.refresh();
          } else if (response.code === "ERR_NETWORK") {
            setLoading(false);
            toast.error("Server Error", {
              position: "top-right",
              duration: 2500,
            });
          } else {
            setLoading(false);
            toast.error(t(response.response.data.message), {
              position: "top-right",
              duration: 3500,
            });
          }
        }}
      >
        <div className="w-[400px] max-w-md mx-auto my-auto p-6 xl:shadow-lg rounded-xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {t("signIn")}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("email")}
                </label>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("password")}
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <p className="mt-2 text-sm text-gray-500 text-right">
                    <Link
                      href="/forgot-password"
                      className="font-semibold leading-6 text-green-700 hover:text-green-800"
                    >
                      {t("forgotPassword")}
                    </Link>
                  </p>
                </div>
              </div>

              <div>
                {!loading ? (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t("signInButton")}
                  </button>
                ) : (
                  <button
                    disabled
                    type="button"
                    className="flex justify-center text-white w-full opacity-50 bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    {t("loading")}
                  </button>
                )}
              </div>
            </Form>

            <p className="mt-4 text-center text-sm text-gray-500">
              {t("notAMember")}{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-green-700 hover:text-green-800"
              >
                {t("signUp")}
              </Link>
            </p>
          </div>
        </div>
      </Formik>
    </LayoutAuth>
  );
}
