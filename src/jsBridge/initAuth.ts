/*
  This function is defined in the JSBridge Specifications
  Reference: https://ktbinnovation.atlassian.net/wiki/spaces/MA/pages/3498704972/JSBridge+Specifications#initAuth
*/
const initAuth = (
  callback: (authorizationCode: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  if (window.JSBridge) {
    // android
    window.bridge.initAuthCallback = callback;
    window.bridge.initAuthCallbackError = callbackError;
    window.JSBridge.initAuth?.();
  } else if (window.webkit) {
    // ios
    window.bridge.initAuthCallback = callback;
    window.bridge.initAuthCallbackError = callbackError;
    const message = { name: "initAuth" };
    window.webkit.messageHandlers.observer.postMessage(message);
  }
};

export default initAuth;
