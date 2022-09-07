import React from "react";
import Box from "@mui/material/Box";

import { ProductCard } from "./ProductCard";
import type { Product } from "../../../domains/receipts";

interface IProps {
  products: Product[]
}

export const ProductCardList: React.FC<IProps> = (props: IProps) => {
  const { products } = props;
  console.log(`card list:${products}`)
  if (!products) {
    return <p>Loading....</p>
  }
  return (
    <Box>
      {products.map((product: Product) =>
        <ProductCard
          key={product.product_id}
          product_id={product.product_id}
          product_name={product.product_name}
          price_wo_tax={product.price_wo_tax}
        />
      )}
    </Box>
  )
}