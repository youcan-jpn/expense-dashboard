import { useState, useEffect, createContext } from 'react';
import { Typography, Box } from '@mui/material';

import { ReceiptTable } from '../models/receipts/ReceiptTable';
import { getReceipts } from '../../api/receipts';
import type { Receipt } from '../../domains/receipts';

export const receiptContext = createContext(()=>{});

export const ReceiptPage = () => {
  const [ receiptList, setReceiptList ] = useState<Receipt[]>([]);
  const fetchReceiptList = async () => {
    const res = await getReceipts(null);
    if (res.isSuccess) {
      const {receipts} = res;
      setReceiptList(receipts);
    }
  }

  useEffect(() => {
    fetchReceiptList();
  }, [])

  return (
    <>
      <Box component="main">
        <Typography variant="h2">Receipts</Typography>
        <receiptContext.Provider value={fetchReceiptList}>
          <ReceiptTable receipts={receiptList}/>
        </receiptContext.Provider>
      </Box>
    </>
  );
}