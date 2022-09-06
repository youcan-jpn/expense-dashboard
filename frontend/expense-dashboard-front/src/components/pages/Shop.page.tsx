import { useEffect, useState, createContext } from 'react';
import { Box, Typography } from '@mui/material';

import { getShops, postShop } from '../../api/shops';
import { Shop } from '../../domains/shops';
import { ShopTable } from '../models/shops/ShopTable';
import { AddShopDialog } from '../models/shops/AddShopDialog';
import { PlusButton } from '../ui/PlusButton';

export const shopContext = createContext(()=>{});

export const ShopPage = () => {
  const [shopList, setShopList] = useState<Shop[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newShopName, setNewShopName] = useState<string>("");

  const fetchShopList = async () => {
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
    fetchShopList()
    setShowModal(false);
  }

  useEffect(() => {
    fetchShopList()
  }, []);

  return (
    <>
      <Box component="main">
        <Typography variant='h2'>Shops</Typography>
        <shopContext.Provider value={fetchShopList}>
          <ShopTable shops={shopList} />
        </shopContext.Provider>
        <AddShopDialog
          open={showModal}
          usage='add'
          openSetter={setShowModal}
          postHandler={handlePost}
          changeHandler={handleChange}
          placeHolder="new shop"
        />
      </Box>
      <PlusButton onClick={() => setShowModal(true)} disabled={false}/>
    </>
  );
}