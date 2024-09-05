import { CustomerProfile } from "@/lib/backend/type/get-customer-profile.type";
import { commonAPIResponse } from "./common";

export interface ExchangeTokenRequest {
  code: string;
}

export interface ExchangeTokenResponse extends commonAPIResponse {
  data?: ExchangeTokenResponseData;
}

export interface ExchangeTokenResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface GetCustomerProfileResponse extends commonAPIResponse {
  data?: GetCustomerProfileResponseData;
}

export type GetCustomerProfileResponseData = CustomerProfile;
