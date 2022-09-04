export type ShopId = number;
type Date = string;

export type Shop = {
  shop_id: ShopId,
  shop_name: string,
  modified_at: Date,
  created_at: Date
};

export type Shops = Shop[];

export type ShopsRes = {
  "shops": Shops
};