import { InquiryTransactionResponseData } from "@/types/payment";
import { ExchangeTokenResponseData } from "@/types/pt-pass";
import {
  httpExchangeToken,
  httpGenerateDeeplink,
  httpGetCustomerProfile,
  httpInquiryTransaction,
} from "./core/http";
import { initAuth, openPwP } from "./core/js-bridge";

export const initAuthAndExchangeToken = async (
  callback?: (result: ExchangeTokenResponseData) => void,
  callbackError?: (errorCode: string, errorDescription: string) => void
) => {
  initAuth(
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

export const getCustomerProfileWithAccessToken = async (
  accessToken: string
) => {
  try {
    return await httpGetCustomerProfile(accessToken);
  } catch (error) {
    console.error(error);
  }
};

export const generateDeeplinkAndOpenPwP = async (
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

    openPwP(result.txnRefId, callbackError);
  } catch (error) {
    console.error(error);
  }
};

export const inquiryTransaction = async (
  partnerTxnRef: string
): Promise<InquiryTransactionResponseData | undefined> => {
  try {
    return await httpInquiryTransaction(partnerTxnRef);
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
