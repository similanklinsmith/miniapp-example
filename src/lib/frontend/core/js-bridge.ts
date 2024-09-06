export const initAuthJSBridge = (
  clientId: string,
  scope: string,
  callback: (authorizationCode: string) => void,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  window.bridge = {
    initAuthCallback: null,
    initAuthCallbackError: null,
  };

  if (window.JSBridge) {
    // android
    window.bridge.initAuthCallback = callback;
    window.bridge.initAuthCallbackError = callbackError;
    window.JSBridge.initAuth?.(clientId, scope);
  } else if (window.webkit) {
    // ios
    window.bridge.initAuthCallback = callback;
    window.bridge.initAuthCallbackError = callbackError;

    window.webkit.messageHandlers.observer.postMessage({
      name: "initAuth",
      clientId: clientId,
      scope: scope,
    });
  }
};

export const openPwPJSBridge = (
  ppoaTnxRefId: string,
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  window.bridge = {
    openPwPCallbackError: null,
  };

  if (window.JSBridge) {
    // android
    window.bridge.openPwPCallbackError = callbackError;
    window.JSBridge.openPwP?.(ppoaTnxRefId);
  } else if (window.webkit) {
    // ios
    window.bridge.openPwPCallbackError = callbackError;

    const message = { name: "openPwP", ppoaTnxRefId: ppoaTnxRefId };
    window.webkit.messageHandlers.observer.postMessage(message);
  }
};
