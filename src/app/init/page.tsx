"use client";
import initAuth from "@/jsBridge/initAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type status = {
  status: string;
  errorCode?: string;
  errorDesc?: string;
  isLoaded: boolean;
};

export default function Init() {
  const router = useRouter();
  const [status, setStatus] = useState<status>({
    status: "starting to init auth...",
    isLoaded: true,
  });

  useEffect(() => {
    initAuth(
      //callback function for success
      (authorizationCode: string) => {
        /*
          Logic to handle the authorization code received from the native app
          after successful authentication
        */

        //example
        setStatus({
          status: "init auth success 🎉",
          isLoaded: false,
        });
        console.log("[initAuth] success 🎉");
        console.log("[initAuth] authCode", authorizationCode);
        router.replace(`/?authCode=${authorizationCode}`);
      },
      //callback function for error
      (errorCode, errorDescription) => {
        /*
          Logic to handle the error received from the native app 
          after failed authentication
        */

        //example
        setStatus({
          status: "init auth failed 😢",
          errorCode: errorCode,
          errorDesc: errorDescription,
          isLoaded: false,
        });
        console.log("[initAuth] failed 😢");
        console.log("[initAuth] error:", errorCode, errorDescription);
      }
    );
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {status.isLoaded ? (
        <Image
          className="animate-spin"
          src={"/assets/icons/spinner.svg"}
          width={16}
          height={16}
          alt="loading"
        />
      ) : null}
      <p className="pt-[32px]">Authorization</p>
      <p className="pt-[32px]">{status.status}</p>
      {(status.errorCode || status.errorDesc) && (
        <p className="text-red-500">
          {status.errorCode}:{status.errorDesc}
        </p>
      )}
    </div>
  );
}
