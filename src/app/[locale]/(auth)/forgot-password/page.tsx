"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Formik, Field, Form } from "formik";
import { toast } from "sonner";
import Lottie from "lottie-react";
import LayoutAuth from "../layout";
import { requestPasswordRestRequest } from "./request";
import tickLottie from "./tick.json"


const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const response = (await requestPasswordRestRequest(values)) as any;

    if (response.status === 200){
      setLoading(false);
      toast.success("Password reset link sent to your email", {
        position: "top-right",
        duration: 2500,
      });
      setIsEmailSent(true);
    } else if (response.code === "ERR_NETWORK") {
      setLoading(false);
      toast.error("Server Error", {
        position: "top-right",
        duration: 2500,
      });
    } else {
      setLoading(false);
      toast.error(response.response.data.message, {
        position: "top-right",
        duration: 2500,
      });
    }

  }


  return (
    <LayoutAuth>
     
      <main
        id="content"
        role="main"
        className="w-full max-w-md mx-auto my-auto mt-40"
      >
        
          {isEmailSent ? (<>
            <Lottie animationData={tickLottie} loop={false} />
            <h2 className="block text-3xl font-bold text-gray-700 text-center">
                    Reset link sent to your email
              </h2>
          </>) : (
            <div className="mt-7 bg-white rounded-xl xl:shadow-lg m-auto">
            <div className="p-4 sm:p-7 w-[400px]">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  className="font-semibold leading-6 text-green-700 hover:text-green-800"
                  href="/login"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <Formik
                initialValues={{ email }}
                validate={(values) => {
                  const errors: Record<string, string> = {};
                  if (!values.email) {
                    errors.email = "Please include a valid email address";
                  }
                  return errors;
                }}
                // onSubmit={async (values) => {
                //   setLoading(true);
                  
                //   const response = (await requestPasswordRestRequest(values)) as any;

                //   if (response.status === 200){
                //     setLoading(false);
                //     toast.success("Password reset link sent to your email", {
                //       position: "top-right",
                //       duration: 2500,
                //     });
                //   } else if (response.code === "ERR_NETWORK") {
                //     setLoading(false);
                //     toast.error("Server Error", {
                //       position: "top-right",
                //       duration: 2500,
                //     });
                //   } else {
                //     setLoading(false);
                //     toast.error(response.response.data.message, {
                //       position: "top-right",
                //       duration: 2500,
                //     });
                //     setIsEmailSent(true);
                //   }
                // }}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-6">
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold ml-1 mb-2"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="email-error"
                      >
                        Please include a valid email address so we can get back
                        to you
                      </p>
                    </div>
                    {/* <button
                    type="submit"
                    className="flex justify-center text-white w-full bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800 inline-flex items-center"
                  >
                    Reset password
                  </button> */}

                    {!loading ? (
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Reset password
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
                        Loading
                      </button>
                    )}
                  </div>
                </Form>
              </Formik>
            </div>

            
          </div>
          </div>
          )}
       
      </main>
     
    </LayoutAuth>
  );
};

export default ForgotPasswordPage;
