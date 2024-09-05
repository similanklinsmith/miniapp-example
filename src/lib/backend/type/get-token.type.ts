import { z } from "zod";

export const getTokenConfigSchema = z.object({
  getTokenUrl: z
    .string({
      message: "ENDPOINT_PAYMENT_GET_TOKEN is not defined in environment variable",
    })
    .url({ message: "ENDPOINT_PAYMENT_GET_TOKEN is not a valid URL" }),
  clientId: z.string({
    message: "TWO_LEGGED_CLIENT_ID is not defined in environment variable",
  }),
  clientSecret: z.string({
    message: "TWO_LEGGED_SECRET_KEY is not defined in environment variable",
  }),
});

export type GetTokenResponse = {
  code: string;
  message: string;
  data?: {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
  };
};
