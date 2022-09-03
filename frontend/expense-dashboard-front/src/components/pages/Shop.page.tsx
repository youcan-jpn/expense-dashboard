import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';

import { getShops, postShop } from '../../api/shops';
import { Shop } from '../../domains/shops';
import { ShopTable } from '../models/shops/ShopTable';
import { PlusButton } from '../ui/PlusButton';

export const ShopPage = () => {
  const [shopList, setShopList] = useState<Shop[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newShopName, setNewShopName] = useState<string>("");

  const fetchData = async () => {
    const res = await getShops(null);
    if (res.isSuccess === true) {
      const {shops} = res;
      setShopList(shops);
    }
  }

  const handleChange = (e: any) => {
    setNewShopName(() => e.target.value);  // TODO: useRefを使った方がよさそう
  }

  const handlePost = async () => {
    const payload = {
      "shop_name": newShopName
    }
    const res = await postShop(null, payload);
    if (!res.isSuccess) {
      console.log(res);
    }
    fetchData()
    setShowModal(false);
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <main>
        <h2>Shops</h2>
        <ShopTable shops={shopList} />
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle id="add-shop-dialog">
            Add New Shop
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="add-shop-dialog-description">
              Enter new shop's name
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Input placeholder='new shop' type="text" id="newShopName" onChange={handleChange}/>
            <Button onClick={handlePost}><SendIcon /></Button>
          </DialogActions>
        </Dialog>
      </main>
      <PlusButton onClick={() => setShowModal(true)} disabled={false}/>
    </>
  );
}