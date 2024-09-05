import { z } from "zod";

export const generateDeeplinkConfigSchema = z.object({
  generateDeeplinkUrl: z
    .string({
      message: "ENDPOINT_PAYMENT_DEEPLINK is not defined in environment variable",
    })
    .url({ message: "ENDPOINT_PAYMENT_DEEPLINK is not a valid URL" }),
  accessToken: z.string(),
  miniappUUID: z.string().uuid(),
  deeplinkUrl: z.string().url(),
  compCode: z.string({
    message:
      "PAYMENT_TXN_CONFIG_COMP_CODE is not defined in environment variable",
  }),
});

export type GenerateDeeplinkRequest = {
  partnerTxnCreatedDt?: string;
  txnSessionValidUntil?: string;
  paymentInfo?: {
    billerId?: string;
    compCode?: string;
    paymentMethod?: string;
    partnerTxnRef: string; // required
    amount: number; // required
    ref1value: string; // required
    ref2value?: string;
    ref3value?: string;
    ref4value?: string;
  };
  additionalInfo?: {
    additionalInfo1?: string;
    additionalInfo2?: string;
    additionalInfo3?: string;
    additionalInfo4?: string;
    additionalInfo5?: string;
    additionalInfo6?: string;
    additionalInfo7?: string;
    additionalInfo8?: string;
    subMerchantName?: string;
  };
  partnerInfo?: {
    deeplink?: string;
  };
};

export type GenerateDeeplinkResponse = {
  status?: Status;
  appToAppDeeplinkUrl?: string;
  deeplinkUrl?: string;
  txnRefId?: string;
  code?: string;
  message?: string;
};

type Status = {
  code: string;
  description: string;
};
