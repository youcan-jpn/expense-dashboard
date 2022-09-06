import React from "react";
import Box from "@mui/material/Box";

import { ProductCard } from "./ProductCard";
import type { Product } from "../../../domains/receipts";

interface IProps {
  products: Product[]
}

export const ProductCardList: React.FC<IProps> = (props: IProps) => {
  const { products } = props;
  return (
    <Box>
      {products.map((product: Product) =>
        <ProductCard
          product_id={product.product_id}
          product_name={product.product_name}
          price_wo_tax={product.price_wo_tax}
        />
      )}
    </Box>
  )
}