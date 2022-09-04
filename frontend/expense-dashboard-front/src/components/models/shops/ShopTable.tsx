import React, { useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { Shop } from '../../../domains/shops';
import { AddShopDialog } from './AddShopDialog';
import { patchShop, getShops } from '../../../api/shops';
import { shopContext } from '../../pages/Shop.page';

interface Prop {
  shops: Shop[]
}

export const ShopTable: React.FC<Prop> = (prop: Prop) => {
  const { shops } = prop;
  const [ openDialog, setOpenDialog ] = useState<boolean>(false);
  const [ placeHolder, setPlaceHolder ] = useState<string>("")
  const [ targetId, setTargetId ] = useState<number>(0);
  const [ newName, setNewName ] = useState<string>("");
  const setShopList = useContext(shopContext);
  const clickHandler = (shop_name: string, shop_id: number) => {
    setPlaceHolder(()=>shop_name);
    setTargetId(() => shop_id);
    setOpenDialog(true);
  };

  const handleChange = (e: any) => {
    setNewName(() => e.target.value)
  }

  const handlePost = async () => {
    const payload = {"shop_name": newName}
    const res = await patchShop(targetId, payload);
    if (!res.isSuccess) {
      console.log(res);
    }
    // Shop.pageのfetchDataを使いまわした方が良い
    const shopRes = await getShops(null);
    if (shopRes.isSuccess === true) {
      const {shops} = shopRes;
      setShopList(shops);
    } else {
      console.log(shopRes);
    }
    setOpenDialog(false);
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Shop ID</TableCell>
              <TableCell align="left">Shop name</TableCell>
              <TableCell align="right">  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops.map((row) => (
              <TableRow
                key={row.shop_id}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.shop_id}
                </TableCell>
                <TableCell align="left">
                  {row.shop_name}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => clickHandler(row.shop_name, row.shop_id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddShopDialog
        open={openDialog}
        usage='alter'
        openSetter={setOpenDialog}
        changeHandler={handleChange}
        postHandler={handlePost}
        placeHolder={placeHolder}
      />
    </>
  );
}
