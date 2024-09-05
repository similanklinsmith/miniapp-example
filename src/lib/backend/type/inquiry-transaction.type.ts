import { z } from "zod";

export const inquiryTransactionConfigSchema = z.object({
  inquiryTransactionUrl: z
    .string({
      message:
        "ENDPOINT_PAYMENT_INQUIRY_TRANSACTION is not defined in environment variable",
    })
    .url({ message: "ENDPOINT_PAYMENT_INQUIRY_TRANSACTION is not a valid URL" }),
  accessToken: z.string(),
});

export const inquiryTransactionRequestSchema = z.object({
  txnRefId: z.string({ message: "txnRefId is required" }),
});

export type InquiryTransactionRequest = z.infer<
  typeof inquiryTransactionRequestSchema
>;
export type InquiryTransactionResponse = {
  status?: Status;
  code?: string;
  message?: string;
  txnRefId?: string;
  partnerTxnCreatedDt?: string;
  txnSessionValidUntil?: string;
  txnStatus?: string;
  paymentInfo?: PaymentInfo;
  additionalInfo?: AdditionalInfo;
  partnerInfo?: PartnerInfo;
};

export type PaymentInfo = {
  partnerTxnRef: string;
  amount: number;
  ref1value: string;
  ref2value: string;
  ref3value: string;
  ref4value: string;
};

export type AdditionalInfo = {
  additionalInfo1: string;
  additionalInfo2: string;
  additionalInfo3: string;
  additionalInfo4: string;
  additionalInfo5: string;
  additionalInfo6: string;
  additionalInfo7: string;
  additionalInfo8: string;
  subMerchantName: string;
};

export type PartnerInfo = {
  deeplink: string;
};

type Status = {
  code: string;
  description: string;
};
