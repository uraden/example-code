"use client";
import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import Link from "next/link";
import { submitOTP } from "./request";
import { toast } from "sonner";
import { AxiosResponse } from 'axios'; 
import {useTranslations} from 'next-intl';


interface OTPResponseData {
  status: number;
  message: string;
  responses: {
    data: {
      message: string;
    };
  };
}

const OTPPage: React.FC = () => {
  const [otp, setOTP] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [reDirectLogin, setReDirectLogin] = useState(false);


  const t = useTranslations("Register");
  // useEffect(() => {
  //   if (document.referrer.includes('/register') || document.referrer === '') {
  //     router.push('/');
  //   }
  // }, []);

  function maskEmail(email: string) {
    const atIndex = email?.indexOf("@");
    if (atIndex !== -1) {
      return (
        email?.slice(0, Math.min(atIndex, 2)) +
        "****" +
        email?.slice(atIndex - 2)
      );
    } else {
      return email;
    }
  }

  useEffect(() => {
    const emailFromURL = new URLSearchParams(window.location.search).get(
      "email"
    );
    if (emailFromURL) {
      setVerifyEmail(emailFromURL);
    }
  }, []);

  const maskedEmail = maskEmail(verifyEmail);

  const verifyOTP = async () => {
    setLoading(true);
    const responseData: AxiosResponse<OTPResponseData> = await (submitOTP({
      otp,
      email: verifyEmail,
    }) as Promise<AxiosResponse<OTPResponseData>>);

    if (responseData?.status === 200) {
      toast.success(
        t("userVerifiedSuccessfully"),
        {
          position: "top-right",
          duration: 4000,
        }
      );
      setLoading(false);
      setReDirectLogin(true);
    } else {
      toast.error(t("invalidOTP"), {
        position: "top-right",
        duration: 3500,
      });
      setLoading(false);
    }

    setOTP("");
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          {!reDirectLogin ? (
            <div className="mx-auto flex w-full max-w-md flex-col space-y-4">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>{t("emailVerification")}</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>{t("sentEmail")} {maskedEmail}</p>
                </div>
              </div>

              <div>
                <div className="flex flex-col space-y-16">
                  <OtpInput
                    value={otp}
                    onChange={setOTP}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus={true}
                    skipDefaultStyles={true}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 1rem",
                      fontSize: "2rem",
                      borderRadius: 4,
                      border: "1px solid rgba(0,0,0,0.3)",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                    containerStyle={{
                      justifyContent: "center",
                    }}
                  />

                  <div className="flex flex-col space-y-5">
                    <div>
                      {!loading ? (
                        <button
                        disabled={otp.length !== 6}
                          className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                            otp.length !== 6
                              ? "border-2 text-black bg-white"
                              : "bg-green-700 text-white"
                          }`}
                          onClick={verifyOTP}
                        >
                          {t("verifyAccount")}
                        </button>
                      ) : (
                        <button
                          disabled
                          type="button"
                          className=" flex justify-center text-white w-full bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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

                    {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p> Didn`t recieve code?</p>{" "}
                    <a
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-md flex-col space-y-4">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-2xl">
                  <p>{t("pleaseLogin")}</p>
                </div>
              </div>

              <div>
                <div className="flex flex-col space-y-8">
                  <p className="flex flex-col items-center">
                    {t("accountVerified")}
                  </p>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <Link
                        href="/login"
                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {t("proceedToLogin")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OTPPage;
