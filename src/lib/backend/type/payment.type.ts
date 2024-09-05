import { z } from "zod";

export const paymentTransactionSchema = z.object({
  partnerTxnCreatedDt: z.string().datetime().default(new Date().toISOString()),
  txnSessionValidUntil: z.string().datetime().optional(),
  paymentInfo: z.object({
    billerId: z.string().optional(),
    compCode: z.string().optional(),
    paymentMethod: z.string().default("KTB-PT"),
    partnerTxnRef: z.string(),
    amount: z.number().finite(),
    ref1value: z.string(),
    ref2value: z.string().optional(),
    ref3value: z.string().optional(),
    ref4value: z.string().optional(),
  }),
  additionalInfo: z
    .object({
      additionalInfo1: z.string().optional(),
      additionalInfo2: z.string().optional(),
      additionalInfo3: z.string().optional(),
      additionalInfo4: z.string().optional(),
      additionalInfo5: z.string().optional(),
      additionalInfo6: z.string().optional(),
      additionalInfo7: z.string().optional(),
      additionalInfo8: z.string().default("BACK_TO_MINIAPP"),
      subMerchantName: z.string().optional(),
    })
    .optional(),
  partnerInfo: z.object({
    deeplink: z.string().url(),
  }),
});

export type PaymentTransaction = z.infer<typeof paymentTransactionSchema>;
