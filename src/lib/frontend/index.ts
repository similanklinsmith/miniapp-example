import { InquiryTransactionResponseData } from "@/types/payment";
import { ExchangeTokenResponseData } from "@/types/pt-pass";
import {
  httpExchangeToken,
  httpGenerateDeeplink,
  httpGetCustomerProfile,
  httpInquiryTransaction,
} from "./core/http";
import { initAuthJSBridge, openPwPJSBridge } from "./core/js-bridge";

/*
  The `initAuth` function sets up the authentication process. 

  1. It uses `initAuthJSBridge` to start authentication with your client ID and scope.
  2. When an authorization code is received, it tries to exchange it for a token.
    - If successful, it calls the `callback` function with the result.
    - If there's an error, it logs the error. you can add your own error handling logic here.
  3. If an authentication error occurs, it calls the `callbackError` function with the error details.
*/
export const initAuth = async (
  callback?: (result: ExchangeTokenResponseData) => void,
  callbackError?: (errorCode: string, errorDescription: string) => void
) => {
  initAuthJSBridge(
    process.env.NEXT_PUBLIC_THREE_LEGGED_CLIENT_ID ?? "",
    process.env.NEXT_PUBLIC_AUTHENTICATION_SCOPE ?? "",
    async (authorizationCode) => {
      try {
        const result = await httpExchangeToken(authorizationCode);
        if (callback) {
          callback(result);
        }
      } catch (error) {
        console.error(error);
      }
    },
    (errorCode, errorDescription) => {
      if (callbackError) {
        callbackError(errorCode, errorDescription);
      }
    }
  );
};

/*
  The `getCustomerProfile` function fetches a customer's profile using an `accessToken`.

  1. It calls `httpGetCustomerProfile` with the provided `accessToken` to retrieve the profile data.
  2. If the request is successful, it returns the profile data.
  3. If an error occurs, it logs the error to the console.
*/
export const getCustomerProfile = async (accessToken: string) => {
  try {
    return await httpGetCustomerProfile(accessToken);
  } catch (error) {
    console.error(error);
  }
};

/*
  The `initPayment` function handles the payment initialization process.

  1. It calls `httpGenerateDeeplink` to generate payment transaction and retrive txnRefId.
  2. It then opens the payment bridge (`openPwPJSBridge`) using txnRefId from step 1.
  3. If there’s an error at any step, it logs the error to the console. You can add your own error handling logic here.
*/
export const initPayment = async (
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  try {
    const result = await httpGenerateDeeplink({
      /*
        In this example, we only use the `amount` field. 
        You can add other fields as needed in the `src/types/payment.ts` file
      */
      amount: 1.5,
    });

    openPwPJSBridge(result.txnRefId, callbackError);
  } catch (error) {
    console.error(error);
  }
};

/*
  The `inquiryPaymentTransaction` function fetches the payment transaction details using the `partnerTxnRef`.

  1. It calls `httpInquiryTransaction` with the provided `partnerTxnRef` to retrieve the transaction details.
  2. If the request is successful, it returns the transaction details.
  3. If an error occurs, it logs the error to the console.
*/
export const inquiryPaymentTransaction = async (
  partnerTxnRef: string
): Promise<InquiryTransactionResponseData | undefined> => {
  try {
    return await httpInquiryTransaction(partnerTxnRef);
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
