import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import ReceiptMenu from './ReceiptMenu';

import type { Receipt, ReceiptId } from '../../../domains/receipts';

interface Prop {
  receipts: Receipt[]
}

export const ReceiptTable: React.FC<Prop> = (prop: Prop) => {
  const { receipts } = prop;
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [ targetReceiptId, setTargetReceiptId ] = useState<ReceiptId>(0);

  const HandleOpenMenu = (e: any, receipt_id: ReceiptId) => {
    setTargetReceiptId(receipt_id);
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const HandleClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const displayDate = (date_string: string) => {
    const date_object = new Date(date_string);
    const ret = date_object.toLocaleDateString();
    return ret;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Receipt ID</TableCell>
              <TableCell align="center">Shop Name</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">Purchase Date</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((row) => (
              <TableRow key={row.receipt_id}>
                <TableCell component="th" scope="row" align="center">
                  {row.receipt_id}
                </TableCell>
                <TableCell align="center">
                  {row.shop_name}
                </TableCell>
                <TableCell align="center">
                  {Number(row.total_price_including_tax).toLocaleString()}円
                </TableCell>
                <TableCell align="center">
                  {displayDate(row.purchase_date)}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => HandleOpenMenu(e, row.receipt_id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReceiptMenu
        receipt_id={targetReceiptId}
        anchorEl={anchorEl}
        onClose={HandleClose}
        open={openMenu}
      />
    </>
  );
}
