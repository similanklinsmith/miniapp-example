"use client";
import React, { useEffect, useState } from "react";

type propsType = {
  children: React.ReactNode;
};

/*
  JSBridgeProvider is a React Context Provider component that initializes the bridge object 
  for communication between the webview and your Mini App.

  **If the bridge object is not initialized, communication with webview will not 
  be possible because the bridge object will be undefined.**
*/

export default function JSBridgeProvider({ children }: propsType) {
  const [initial, setInitial] = useState(false);

  const initBridge = () => {
    window.bridge = {
      initAuthCallback: null,
      initAuthCallbackError: null,
    };
  };

  useEffect(() => {
    initBridge();
    setInitial(true);
  }, []);

  if (!initial) {
    return null;
  }

  return children;
}
