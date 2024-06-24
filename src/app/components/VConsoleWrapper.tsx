"use client";

import Script from "next/script";

declare var VConsole: any;

export default function VConsoleWrapper() {
  // Return null to avoid loading VConsole in production
  if (process.env.NEXT_PUBLIC_APP_ENV === "prd") {
    return null;
  }

  return (
    <Script
      src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
      onReady={() => {
        new VConsole();
      }}
    />
  );
}
