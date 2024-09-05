declare global {
  var transactionStorage: Map<string, string>;
}

export const addTransaction = (partnerTxnRef: string, txnRefId: string) => {
  if (!global.transactionStorage) {
    global.transactionStorage = new Map<string, string>();
  }
  global.transactionStorage.set(partnerTxnRef, txnRefId);
};

export const getTransaction = (partnerTxnRef: string) => {
  if (!transactionStorage) {
    return;
  }
  return global.transactionStorage.get(partnerTxnRef);
};
