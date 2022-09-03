import { useEffect, useState } from 'react';

import { getShops, postShop } from '../../api/shops';
import { Shop } from '../../domains/shops';
import { ShopTable } from '../models/shops/ShopTable';
import { AddShopDialog } from '../models/shops/AddShopDialog';
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
        <AddShopDialog
          open={showModal}
          usage='add'
          openSetter={setShowModal}
          postHandler={handlePost}
          changeHandler={handleChange}
          placeHolder="new shop"
        />
      </main>
      <PlusButton onClick={() => setShowModal(true)} disabled={false}/>
    </>
  );
}