import { useEffect, useState } from 'react';

import { getShops } from '../../api/shops';
import { Shop } from '../../domains/shops';

export const Shops = () => {
  const [shopList, setShopList] = useState<Shop[]>([]);
  useEffect(() => {
    async function fetchData () {
      const res = await getShops(null);
      console.log(res);
      if (res.isSuccess === true) {
        const {shops} = res;
        setShopList(shops);
      }
    }
    fetchData()
  }, []);

  return (
    <>
      <main>
        <h2>Shops</h2>
        <p>
          Shop list will be displayed here.
        </p>
        <ol>
          {shopList.map((row: Shop) => (
            <li>{row.shop_id}-{row.shop_name} / {row.modified_at} / {row.created_at}</li>
          ))}
        </ol>
      </main>
    </>
  );
}