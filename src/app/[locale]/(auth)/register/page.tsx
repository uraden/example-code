"use client";
import React, { useState } from "react";
import LayoutAuth from "../layout";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { requestRegister } from "./request";
import {useTranslations} from 'next-intl';

interface IRegister {
  name?: unknown;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}


export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const t = useTranslations('Register');

  return (
    <LayoutAuth>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors: IRegister = {};

          // Name
          if (!values.name) {
            // need to add t translation for error message
            errors.name = t('required');
          } else if (/\d/.test(values.name)) {
            errors.name = t('notNumberField');
          } else if (values.name.length < 3) {
            errors.name = t('minLength');
          }

          // Email
          if (!values.email) {
            errors.email = t('required');
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = t('invalidEmail');
          }

          // Phone
          if (!values.phone) {
            errors.phone = t('required');
          } else if (values.phone.length !== 9) {
            errors.phone = t('invalidPhoneNumber');
          }

          // Password
          if (!values.password) {
            errors.password = t('required');
          } else if (values.password.length < 8) {
            errors.password = t('minLengthPassword')
          } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(values.password)) {
            errors.password =
              t('passwordRequirements');
          }

          // Confirm Password
          if (!values.confirmPassword) {
            errors.confirmPassword = t('required');
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = t('passwordsDoNotMatch')
          }
          return errors;
        }}
        onSubmit={async (values) => {
          setLoading(true);

          try {
            const response = await requestRegister({
              name: values.name,
              email: values.email,
              phone: values.phone,
              password: values.password,
            });

            console.log("this is response", response.status);
            if (response.status === 200 || response.status === 201) {
              setLoading(false);
              toast.success(
                t("registrationSuccessful"),
                {
                  position: "top-right",
                  duration: 3500,
                }
              );
              // set timeout for 2 seconds then redirect to otp
              setTimeout(() => {
                router.push(`otp?email=${values.email}`);
              }, 2000);
            } else if (response.code === "ERR_NETWORK") {
              setLoading(false);
              toast.error("Server Error", {
                position: "top-right",
                duration: 2500,
              });
            } else {
              setLoading(false);
              toast.error(response.data.message, {
                position: "top-right",
                duration: 3500,
              });
            }
          } catch (error) {
            setLoading(false);
            toast.error("Failed to connect to the server", {
              position: "top-right",
              duration: 2500,
            });
          }
        }}
      >
         <div className="w-full max-w-md mx-auto my-auto xl:shadow-lg rounded-xl mt-10">
        <div className="w-[400px] flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {t('signUp')}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t('name')}
                </label>
                <div className="mt-2">
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t('email')}
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
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t('phoneNumber')}
                </label>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div
                      id="dropdown-phone-button"
                      data-dropdown-toggle="dropdown-phone"
                      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    >
                      +998
                    </div>
                   
                  
                      <Field
                        type="text"
                        name="phone"
                        id="phone"
                        // className="block w-full p-2.5 rounded-e-lg border-s-0 border border-gray-30"
                         className="block w-full rounded-e-lg border-0 pb-[0.625rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                        placeholder="00-123-45-67"
                        required
                      />
                   
                  </div>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t('password')}
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t('confirmPassword')}
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <button
                    disabled
                    type="button"
                    className=" flex justify-center text-white w-full bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t('signUpButton')}
                  </button>
                )}
              </div>
            </Form>

            <p className="mt-10 text-center text-sm text-gray-500">
              {t('alreadyAMember')}{" "}
              <Link
                href="/login"
                className="font-semibold leading-6 text-green-700 hover:text-green-800"
              >
                {t('signIn')}
              </Link>
            </p>
          </div>
        </div>
        </div>
      </Formik>
    </LayoutAuth>
  );
}
