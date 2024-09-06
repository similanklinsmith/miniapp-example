import { getTransaction } from "@/app/api/mock-storage";
import { responseError, responseSuccess } from "@/app/api/response";
import {
  get2LeggedAccessToken,
  inquiryTransactionService,
} from "@/lib/backend";
import { LibError } from "@/lib/error/lib-error";
import { InquiryTransactionResponseData } from "@/types/payment";

export async function POST(
  request: Request,
  { params }: { params: { partnerTxnRef: string } }
) {
  const partnerTxnRef = params.partnerTxnRef;

  /*
    GUILD: Before calling the inquiry transaction, retrieve the txnRefId from storage, 
           as it is required as a parameter for the inquiry transaction.
  */
  const txnRefId = getTransaction(partnerTxnRef);
  if (!txnRefId) {
    return responseError("CL404", "transaction not found");
  }

  try {
    const token = await get2LeggedAccessToken();

    /*
      Example of how to use the functions from the lib/backend/index.ts
    */
    const inquiryTransactionResponse = await inquiryTransactionService(
      token.data?.access_token ?? "",
      txnRefId
    );

    const response: InquiryTransactionResponseData = {
      txnRefId: inquiryTransactionResponse.txnRefId ?? "-",
      partnerTxnCreatedDt:
        inquiryTransactionResponse.partnerTxnCreatedDt ?? "-",
      txnSessionValidUntil:
        inquiryTransactionResponse.txnSessionValidUntil ?? "-",
      txnStatus: inquiryTransactionResponse.txnStatus ?? "-",
      paymentInfo: inquiryTransactionResponse.paymentInfo ?? ({} as any),
      additionalInfo: inquiryTransactionResponse.additionalInfo ?? ({} as any),
      partnerInfo: inquiryTransactionResponse.partnerInfo ?? ({} as any),
    };

    return responseSuccess(response);
  } catch (error) {
    if (error instanceof LibError) {
      return responseError(error.code, error.message);
    }
    return responseError("CL9999", `error inquiry transaction ${error}`);
  }
}
