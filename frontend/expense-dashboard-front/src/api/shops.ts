import api, { ApiFunction, Result, success, failure } from '../lib/apiWrapper';

import type {
  ShopsRes,
} from '../domains/shops'

export const getShops: ApiFunction<null, null, Result<ShopsRes, unknown>> = async () =>{
  try {
    const response = await api.get<ShopsRes>('/shops');
    return success(response.data);
  } catch (err) {
    return failure({ err });
  }
};
