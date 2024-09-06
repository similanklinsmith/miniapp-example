import { z } from "zod";

export const exchangeTokenConfigSchema = z.object({
  authenticationRedirectUrl: z
    .string({
      message:
        "AUTHENTICATION_REDIRECT_URL is not defined in environment variable",
    })
    .url({ message: "AUTHENTICATION_REDIRECT_URL is not a valid URL" }),
  authenticationScope: z.string({
    message: "AUTHENTICATION_SCOPE is not defined in environment variable",
  }),
  threeLeggedClientId: z.string({
    message: "THREE_LEGGED_CLIENT_ID is not defined in environment variable",
  }),
  threeLeggedSecret: z.string({
    message: "THREE_LEGGED_SECRET_KEY is not defined in environment variable",
  }),
  exchangeTokenServiceUrl: z
    .string({
      message: "ENDPOINT_EXCHANGE_TOKEN is not defined in environment variable",
    })
    .url({ message: "ENDPOINT_EXCHANGE_TOKEN is not a valid URL" }),
});

export const exchangeTokenRequestSchema = z.object({
  code: z.string({ message: "code is required" }),
});

export type ExchangeTokenConfig = z.infer<typeof exchangeTokenConfigSchema>;
export type ExchangeTokenRequest = z.infer<typeof exchangeTokenRequestSchema>;
export type ExchangeTokenResponse = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
};
