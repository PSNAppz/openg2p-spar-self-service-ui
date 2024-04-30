"use client";

import {CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {getFa} from "@/utils/resolve";
import { unlinkFa } from "@/utils/unlink";
import Link from "next/link";
import {useLocale} from "next-intl";
import Image from "next/image";
import {useTranslations} from "next-intl";
import { prefixBasePath} from "@/utils/path";
import {useUnlinked} from "@/app/store/auth-context";

export default function GetFaBox() {
  const localActive = useLocale();
  const [getFaResult, setGetFaResult] = useState<any>();
  const {setIsUnLinked} = useUnlinked();
  // 0 - default/empty. 1 - loading. 2 - output. 3 - error.
  const [renderState, setRenderState] = useState(0);
  const t = useTranslations("home");

  function onClick() {
    setRenderState(1);
    getFa(
      (res) => {
        if (res.response_payload.fa) {
          setGetFaResult(res.response_payload.fa);
        }
        else if(res.response_payload.fa===null){
          setGetFaResult(res.response_payload.fa);
        }
        setRenderState(2);
      },
      (res, err) => {
        console.log("Received Error checking for get FA status", res, err);
      }
    );
  }
  

  useEffect(() => {
    onClick();
  }, []);

  const handleClick = () => {
    unlinkFa();
    setIsUnLinked(true);
  };
  
  
  return (
    <>
      <div className="container 2xl:m-36 ">
        {renderState === 1 && (
          <div className=" flex justify-content-center">
            <div className="mx-auto my-10">
              <CircularProgress />
            </div>
          </div>
        )}
        {renderState === 2 && getFaResult === null && (
          <div className="flex justify-content-center items-center mt-16 ml-16">
            <div className="flex flex-col">
              <div className="text-orange-500 text-3xl">{t("title_2")}</div>
              <div className="w-full border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
              <p className="text-gray-800 mt-4 text-lg">{t("description")}</p>
              <div className="bg-black rounded-3xl shadow-md shadow-orange-300 w-full h-12 mt-6 flex items-center justify-center">
                <Link href={`/${localActive}/update`} className="text-white text-sm">
                  {t("button_text")}
                </Link>
              </div>
            </div>
          </div>
        )}
      {renderState === 2 && getFaResult && (
        <div>
          <ul className="w-full">
          <div className="flex flex-col">
            <div className="text-orange-500 text-2xl">{t("title")}</div>
            <div className="w-full border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4 mb-4"></div>
          </div>
          <>
            {getFaResult.fa_type === "bank" && (
              <>
                <li className="border-b-2  border-orange-200 border-opacity-100 p-2 flex items-start space-x-4">
                <div className="flex flex-row">
                <span>
                  <Image
                    className="w-10 h-10 inline-block mt-2 bg-orange-200 rounded-lg"
                    src={prefixBasePath(`/img/${t("bank")}.png`)}
                    alt={t("bank")}
                    width={50}
                    height={50}
                  />
                </span>
                  <div className="flex-1 min-w-0 mt-1 pl-4">
                    <div className="text-sm font-medium text-gray-600 no-underline">{t("bank")}</div>
                    <p className="text-md text-black font-semibold mx-auto">{getFaResult.bank_name}({getFaResult.bank_code})</p>
                  </div>
                  </div>
                </li>
                <li className="border-b-2  border-orange-200 border-opacity-100 p-2 flex items-start space-x-4">
                  <div className="flex flex-row">
                  <div className="pl-10"></div>
                    <div className="flex-1 min-w-0 mt-1 pl-4">
                      <div className="text-sm font-medium text-gray-600 no-underline">{t("branch")}</div>
                      <p className="text-md text-black font-semibold mx-auto">{getFaResult.branch_name}({getFaResult.branch_code})</p>
                    </div>
                    </div>
                </li>
                <li className="border-b-2  border-orange-200 border-opacity-100 p-2 flex items-start space-x-4">
                  <div className="flex flex-row">
                  <div className="pl-10"></div>
                    <div className="flex-1 min-w-0 mt-1 pl-4">
                      <div className="text-sm font-medium text-gray-600 no-underline">{t("account")}</div>
                      <p className="text-md text-black font-semibold mx-auto">{getFaResult.account_number}</p>
                    </div>
                    </div>
                </li>
              </>
            )}
            {getFaResult.fa_type === "mobile" && (
              <>
              <li className="border-b-2  border-orange-200 border-opacity-100 p-2 flex items-start space-x-4">
                <div className="flex flex-row">
                <span>
                  <Image
                    className="w-10 h-10 inline-block mt-2 bg-orange-200 rounded-lg"
                    src={prefixBasePath(`/img/${t("_provider")}.png`)}
                    alt={t("mobile_provider")}
                    width={50}
                    height={50}
                  />
                </span>
                  <div className="flex-1 min-w-0 mt-1 pl-4">
                    <div className="text-sm font-medium text-gray-600 no-underline">{t("mobile_provider")}</div>
                    <p className="text-md text-black font-semibold mx-auto">{getFaResult.wallet_provider_name}({getFaResult.wallet_provider_code})</p>
                  </div>
                  </div>
                </li>
                <li className="border-b-2  border-orange-200 border-opacity-100 p-2 flex items-start space-x-4">
                  <div className="flex flex-row">
                  <div className="pl-10"></div>
                    <div className="flex-1 min-w-0 mt-1 pl-4">
                      <div className="text-sm font-medium text-gray-600 no-underline">{t("mobile_number")}</div>
                      <p className="text-md text-black font-semibold mx-auto">{getFaResult.mobile_number}</p>
                    </div>
                    </div>
                </li>
              </>
            )}
            {getFaResult.fa_type === "email" && (
              <>
              <li className="border-b-2  border-orange-200 border-opacity-100 p-2 flex items-start space-x-4">
                <div className="flex flex-row">
                <span>
                  <Image
                    className="w-10 h-10 inline-block mt-2 bg-orange-200 rounded-lg"
                    src={prefixBasePath(`/img/email.png`)}
                    alt={t("email_provider")}
                    width={50}
                    height={50}
                  />
                </span>
                  <div className="flex-1 min-w-0 mt-1 pl-4">
                    <div className="text-sm font-medium text-gray-600 no-underline">{t("email_provider")}</div>
                    <p className="text-md text-black font-semibold mx-auto">{getFaResult.wallet_provider_name}({getFaResult.wallet_provider_code})</p>
                  </div>
                  </div>
                </li>
                <li className="border-b-2  border-orange-200 border-opacity-100 p-2 flex items-start space-x-4">
                  <div className="flex flex-row">
                  <div className="pl-10"></div>
                    <div className="flex-1 min-w-0 mt-1 pl-4">
                      <div className="text-sm font-medium text-gray-600 no-underline">{t("email")}</div>
                      <p className="text-md text-black font-semibold mx-auto">{getFaResult.email_address}</p>
                    </div>
                    </div>
                </li>
              </>
            )}
          </>
        </ul>
        <div className="flex justify-center">
          <div className="  p-2   mt-6 mr-2">
            <Link href={`/${localActive}/update`} className="text-blue-700 text-sm">
              {t("button_text2")}
            </Link>
          </div>
          <div className="   p-2    mt-6 ml-2">
            <Link onClick={handleClick} href={`/${localActive}/delete`} className="text-blue-700 text-sm">
              {t("button_text3")}
            </Link>
          </div>
        </div>
        </div>
      )}
      </div>
    </>
  );
}
