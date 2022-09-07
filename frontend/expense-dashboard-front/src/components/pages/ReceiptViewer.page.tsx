import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

import { getReceiptById } from '../../api/receipts';
import { ProductCardList } from '../models/products/ProductCardList';
import { ProductCard } from '../models/products/ProductCard';

import { Product, ReceiptDetailRes } from '../../domains/receipts';
import type { Success } from '../../lib/apiWrapper';

export const ReceiptViewerPage = () => {
  const params = useParams();
  const receipt_id = Number(params.receipt_id)
  const [receipt, setReceipt] = useState<Success<ReceiptDetailRes>>({"product_list": [{"product_name": "sample"}]} as Success<ReceiptDetailRes>)
  const [shopName, setShopName] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [modifiedAt, setModifiedAt] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchReceipt = async () => {
    console.log("fetching receipt")
    const res = await getReceiptById(receipt_id);
    console.log("fetched receipt")
    if (res.isSuccess) {
      setReceipt(() => res);
      setShopName(res.shop_name);
      setCreatedAt(res.created_at);
      setModifiedAt(res.modified_at);
      setProducts(res.product_list);
      console.log(`receipt viewer:${res}`);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    fetchReceipt();
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <>
      <Box component="main">
        <Typography variant="h2">Receipt Viewer</Typography>
        <Typography>ID: {receipt_id}</Typography>
        <Typography>購入場所: {shopName}</Typography>
        <Typography>登録日時：{createdAt}</Typography>
        <Typography>最終更新：{modifiedAt}</Typography>
        <ProductCardList products={products} />
      </Box>
    </>
  );
}