import { InquiryTransactionResponse as InquiryTransactionResponseLib } from "@/lib/backend/type/inquiry-transaction.type";
import { commonAPIResponse } from "./common";

export interface GenerateDeeplinkRequest {
  amount: number;
}

export interface GenerateDeeplinkResponse extends commonAPIResponse {
  data: GenerateDeeplinkResponseData;
}

export interface GenerateDeeplinkResponseData {
  txnRefId: string;
}

export interface InquiryTransactionRequest {}

export interface InquiryTransactionResponse extends commonAPIResponse {
  data?: InquiryTransactionResponseData;
}

export type InquiryTransactionResponseData = InquiryTransactionResponseLib;
