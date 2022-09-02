import api, { ApiFunction, Result, success, failure } from '../lib/apiWrapper';

import type {
  ShopsRes,
} from '../domains/shops'

interface Payload {
  "shop_name": string
}

export const getShops: ApiFunction<null, null, Result<ShopsRes, unknown>> = async () => {
  try {
    const response = await api.get<ShopsRes>('/shops');
    return success(response.data);
  } catch (err) {
    return failure({ err });
  }
};

export const postShop: ApiFunction<null, Payload, Result<ShopsRes, unknown>> = async (_, shop_name) => {
  try {
    const response = await api.post('/shops', {
      shop_name: shop_name
    })
    return success(response.data)
  } catch (err) {
    return failure({ err })
  }
};