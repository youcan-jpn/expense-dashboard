import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

import { getReceiptById } from '../../api/receipts';
import { ProductCardList } from '../models/products/ProductCardList';

import type { ReceiptDetailRes } from '../../domains/receipts';
import type { Success } from '../../lib/apiWrapper';

export const ReceiptViewerPage = () => {
  const params = useParams();
  const receipt_id = Number(params.receipt_id)
  const [receipt, setReceipt] = useState<Success<ReceiptDetailRes>>({} as Success<ReceiptDetailRes>)

  const fetchReceipt = async () => {
    console.log("fetching receipt")
    const res = await getReceiptById(receipt_id);
    console.log("fetched receipt")
    if (res.isSuccess) {
      setReceipt(() => res);
      console.log(`receipt viewer:${res}`);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    fetchReceipt();
  });

  return (
    <>
      <Box component="main">
        <Typography variant="h2">Receipt Viewer</Typography>
        <Typography>ID: {receipt_id}</Typography>
        <Typography>購入場所: {receipt.shop_name}</Typography>
        <Typography>登録日時：{receipt.created_at}</Typography>
        <Typography>最終更新：{receipt.modified_at}</Typography>
        <ProductCardList products={receipt.product_list} />
      </Box>
    </>
  );
}