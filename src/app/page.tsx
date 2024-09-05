"use client";

import {
  generateDeeplinkAndOpenPwP,
  getCustomerProfileWithAccessToken,
  initAuthAndExchangeToken,
} from "@/lib/frontend";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Image
        src={"/assets/logo/mini-app-logo.svg"}
        className="logo mini-app"
        width={96}
        height={96}
        alt="Mini App logo"
      />

      <div className="flex flex-col justify-center items-center pt-14">
        <h1 className="text-3xl font-semibold">Welcome to Mini App</h1>
      </div>

      {
        //Example of how to use the functions from the lib/frontend/index.ts
      }
      {/* <button
        onClick={() =>
          generateDeeplinkAndOpenPwP((errorCode, errorDescription) => {
            console.error(errorCode, errorDescription);
          })
        }
      >
        Payment
      </button>

      <button
        onClick={() =>
          initAuthAndExchangeToken(
            (result) => {
              // add logic to handle accessToken here
              console.log(result);
              sessionStorage.setItem("accessToken", result.accessToken);
            },
            (errorCode, errorDescription) => {
              console.error(errorCode, errorDescription);
            }
          )
        }
      >
        Exchange Token
      </button>

      <button
        onClick={async () => {
          const result = await getCustomerProfileWithAccessToken(
            sessionStorage.getItem("accessToken") ?? ""
          );
          console.log(result);
        }}
      >
        Get Customer Profile
      </button> */}
    </div>
  );
}
