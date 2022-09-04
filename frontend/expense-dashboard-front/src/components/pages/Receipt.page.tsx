import { useState, useEffect, createContext } from 'react';
import { ReceiptTable } from '../models/receipts/ReceiptTable';
import { getReceipts } from '../../api/receipts';
import type { Receipt } from '../../domains/receipts';

export const receiptContext = createContext(()=>{});

export const ReceiptPage = () => {
  const [ receiptList, setReceiptList ] = useState<Receipt[]>([]);
  const fetchReceiptList = async () => {
    const res = await getReceipts(null);
    if (res.isSuccess === true) {
      const {receipts} = res;
      setReceiptList(receipts);
    }
  }

  useEffect(() => {
    fetchReceiptList();
  }, [])

  return (
    <>
      <main>
        <h2>Receipts</h2>
        <receiptContext.Provider value={fetchReceiptList}>
          <ReceiptTable receipts={receiptList}/>
        </receiptContext.Provider>
      </main>
    </>
  );
}