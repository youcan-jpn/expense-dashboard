import React from "react";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

import type { Price } from "../../../domains/receipts";

interface IProps {
  "product_id": number,
  "product_name": string,
  "price_wo_tax": Price,
}

export const ProductCard: React.FC<IProps> = (props: IProps) => {
  const {product_id, product_name, price_wo_tax} = props;

  return (
    <Card>
      <CardContent>
        <Typography>product ID: {product_id}</Typography>
        <Typography>{product_name}</Typography>
        <Typography>税抜 {price_wo_tax.toLocaleString()}円</Typography>
      </CardContent>
    </Card>
  )
}