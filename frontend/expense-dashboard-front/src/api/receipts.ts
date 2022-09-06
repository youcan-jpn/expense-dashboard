import api, { ApiFunction, Result, success, failure } from '../lib/apiWrapper';

import type {
  ReceiptsRes, ReceiptId
} from '../domains/receipts'

export const getReceipts: ApiFunction<null, null, Result<ReceiptsRes, unknown>> = async () => {
  try {
    const response = await api.get<ReceiptsRes>('/receipts');
    return success(response.data);
  } catch (err) {
    return failure({ err });
  }
};

export const deleteReceiptById: ApiFunction<ReceiptId, null, Result<unknown, unknown>> = async (receipt_id) => {
  try {
    const response = await api.delete(`/receipts/${receipt_id}`);
    return success(response.data);
  } catch (err) {
    return failure({ err });
  }
};

export const getReceiptById: ApiFunction<ReceiptId, null, Result<undefined, unknown>> = async (receipt_id) => {
  try {
    const response = await api.get(`/receipts/${receipt_id}`);
    return success(response.data);
  } catch (err) {
    return failure({ err });
  }
};