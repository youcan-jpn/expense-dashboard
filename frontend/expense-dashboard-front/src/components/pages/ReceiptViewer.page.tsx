import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

import { getReceiptById } from '../../api/receipts';
import { ProductTable } from '../models/products/ProductTable';
import { TimeStamps } from '../ui/TimeStamps';


import { Product, ReceiptDetailRes } from '../../domains/receipts';
import type { Success } from '../../lib/apiWrapper';

export const ReceiptViewerPage = () => {
  const params = useParams();
  const receipt_id = Number(params.receipt_id)
  const [ , setReceipt] = useState<Success<ReceiptDetailRes>>({"product_list": [{"product_name": "sample"}]} as Success<ReceiptDetailRes>)
  const [shopName, setShopName] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [modifiedAt, setModifiedAt] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [purchaseDate, setPurchaseDate] = useState<string>("");

  const fetchReceipt = async () => {
    console.log("fetching receipt")
    const res = await getReceiptById(receipt_id);
    console.log("fetched receipt")
    if (res.isSuccess) {
      setReceipt(() => res);
      setShopName(res.shop_name);
      setPurchaseDate(res.purchase_date);
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
        <Typography>Receipt ID: {receipt_id}</Typography>
        <Typography>Shop: {shopName}</Typography>
        <Typography>Purchase Date: {purchaseDate}</Typography>
        <ProductTable products={products} />
        <TimeStamps created_at={createdAt} modified_at={modifiedAt} />
      </Box>
    </>
  );
}