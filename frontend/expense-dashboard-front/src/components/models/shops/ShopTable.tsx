import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Shop } from '../../../domains/shops';


interface Prop {
  shops: Shop[]
}
export const ShopTable: React.FC<Prop> = (prop: Prop) => {
  const { shops } = prop;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Shop ID</TableCell>
            <TableCell align="right">Shop name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shops.map((row) => (
            <TableRow
              key={row.shop_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.shop_id}
              </TableCell>
              <TableCell align="right">{row.shop_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
