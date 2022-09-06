import type { ShopId } from './shops';

export type ReceiptId = number
type Date = string;
type DateTime = string;
type Price = number;

export type Product = {
    product_id: number,
    product_name: number,
    price_wo_tax: Price,
    tax_id: number
};

export type Receipt = {
    receipt_id: ReceiptId,
    shop_id: ShopId,
    shop_name: string,
    purchase_date: Date,
    discount_price: Price,
    total_price_including_tax: Price,
    modified_at: DateTime,
    created_at: DateTime,
    product_list: Product[]
};

export type ReceiptsRes = {
    "receipts": Receipt[]
};