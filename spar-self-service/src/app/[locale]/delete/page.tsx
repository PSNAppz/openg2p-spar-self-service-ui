"use client";
import Image from "next/image";
import {AuthUtil} from "@/app/components/auth";
import {useLocale} from "next-intl";
import {Suspense, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {prefixBasePath} from "@/utils/path";
import Loading from "../loading";
import {useUnlinked} from "@/app/store/auth-context";
export default function Next() {
  const localActive = useLocale();
  const t = useTranslations("Delete");
  const {isUnLinked} = useUnlinked();
  const router = useRouter();
  useEffect(() => {
    if (!isUnLinked) {
      router.push("/en/home");
    }
  }, []);
  return (
    <main>
      <AuthUtil failedRedirectUrl={`/${localActive}/login`} />
      <div className="flex flex-row ">
        <div className="2xl:h-screen bg-gray-100 basis-1/2 flex items-center justify-center">
          <div className="pl-6 mt-16">
            <img src={prefixBasePath("/img/infographic_02.png")} alt="person" />
          </div>
        </div>
        <div className="w-full max-w-sm m-20 basis-1/2">
          <div className="2xl:mt-52 m-5 mt-12">
            <Suspense fallback={<Loading />}>
              <div className=" items-center  m-4 p-6  transition duration-300 transform hover:shadow-sky-200 hover:shadow-lg   border-dashed border-gray-400  border-2 rounded-2xl">
                <div className="flex flex-col m-3 flex-wrap">
                  <Image
                    src={prefixBasePath("/img/remove.png")}
                    alt="remove"
                    width={60}
                    height={60}
                  />
                  <p className="text-3xl text-sky-500 mt-2">{t("delete")}</p>
                  <p className="font-roboto-light text-xl text-wrap">{t("status_message")}</p>

                  <Link href={`/${localActive}/home`}>
                    <Image
                      className="ml-48 mt-4"
                      src={prefixBasePath("/img/arrow_02.png")}
                      alt="person"
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
