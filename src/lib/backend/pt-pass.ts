/*
  For ingratiation with PT Pass API
  we provide 2 functions to exchange token and get customer profile

  - exchangeToken(req: ExchangeTokenRequest): Promise<ExchangeTokenResponse>
  - getCustomerProfile(accessToken: string): Promise<GetCustomerProfileResponse>

  Please set the following environment variables before using the functions:
  - THREE_LEGGED_CLIENT_ID
  - THREE_LEGGED_SECRET_KEY
  - AUTHENTICATION_REDIRECT_URL
  - AUTHENTICATION_SCOPE
  - URL_EXCHANGE_TOKEN
  - URL_GET_CUSTOMER_PROFILE
*/

import { randomUUID } from "crypto";
import { LibError } from "../error/lib-error";
import {
  exchangeTokenConfigSchema,
  ExchangeTokenRequest,
  exchangeTokenRequestSchema,
  ExchangeTokenResponse,
} from "./type/exchange-token.type";

import {
  getCustomerProfileConfigSchema,
  getCustomerProfileRequestSchema,
  GetCustomerProfileResponse,
} from "./type/get-customer-profile.type";

export const exchangeTokenService = async (
  req: ExchangeTokenRequest
): Promise<ExchangeTokenResponse> => {
  const config = exchangeTokenConfigSchema.safeParse({
    authenticationRedirectUrl: process.env.AUTHENTICATION_REDIRECT_URL,
    authenticationScope: process.env.AUTHENTICATION_SCOPE,
    threeLeggedClientId: process.env.THREE_LEGGED_CLIENT_ID,
    threeLeggedSecret: process.env.THREE_LEGGED_SECRET_KEY,
    exchangeTokenServiceUrl: process.env.URL_EXCHANGE_TOKEN,
  });
  if (!config.success) {
    throw new LibError(config.error.message, "LB400", config.error);
  }

  const requestData = exchangeTokenRequestSchema.safeParse(req);
  if (!requestData.success) {
    throw new LibError(requestData.error.message, "LB400", requestData.error);
  }

  const form = new URLSearchParams();
  form.append("code", requestData.data.code);
  form.append("grant_type", "authorization_code");
  form.append("redirect_uri", config.data.authenticationRedirectUrl);
  form.append("client_id", config.data.threeLeggedClientId);
  form.append("client_secret", config.data.threeLeggedSecret);
  form.append("state", randomUUID().toString());
  form.append("scope", config.data.authenticationScope);

  try {
    const rawResponse = await fetch(`${process.env.URL_EXCHANGE_TOKEN}`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: form,
    });

    if (rawResponse.status !== 200) {
      const res = await rawResponse.json();

      throw new LibError(
        res.error_description ||
          `fail to exchange token: ${rawResponse.status} ${JSON.stringify(
            res
          )}`,
        res.error
      );
    }

    const exchangeTokenResponse =
      (await rawResponse.json()) as ExchangeTokenResponse;

    return exchangeTokenResponse;
  } catch (error) {
    throw new LibError(`exchange token error: ${error}`, "LB9999", error);
  }
};

export const getCustomerProfileService = async (
  accessToken: string
): Promise<GetCustomerProfileResponse> => {
  const config = getCustomerProfileConfigSchema.safeParse({
    getCustomerProfileUrl: process.env.URL_GET_CUSTOMER_PROFILE,
  });

  if (!config.success) {
    throw new LibError(config.error.message, "LB400", config.error);
  }

  const requestData = getCustomerProfileRequestSchema.safeParse({
    accessToken,
  });
  if (!requestData.success) {
    throw new LibError(requestData.error.message, "LB400", requestData.error);
  }

  try {
    const rawResponse = await fetch(config.data.getCustomerProfileUrl, {
      method: "POST",
      headers: {
        Authorization: requestData.data.accessToken,
      },
    });

    if (rawResponse.status !== 200) {
      const res = (await rawResponse.json())

      console.log(res);
      
      throw new LibError(res.message, res.code);
    }

    const customerProfile =
      (await rawResponse.json()) as GetCustomerProfileResponse;

    return customerProfile;
  } catch (error) {
    if (error instanceof LibError) {
      throw error;
    }
    throw new LibError(`get customer profile error: ${error}`, "LB9999", error);
  }
};
