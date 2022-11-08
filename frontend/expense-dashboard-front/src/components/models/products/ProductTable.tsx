import { DataGrid, GridColDef } from '@mui/x-data-grid';

import type { Product } from "../../../domains/receipts";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  { field: 'name', headerName: 'Name', type: 'string', width: 130 },
  { field: 'price', headerName: 'Price (ex tax)', type: 'number', width: 130 },
  { field: "currency", headerName: 'Currency', type: 'string', width: 130 },
];

const getRow = (product: Product) => {
  return {
    "id": product.product_id,
    "name": product.product_name,
    "price": product.price_wo_tax,
    "currency": "円",
  }
}

interface IProps {
  products: Product[]
}

export const ProductTable = (props: IProps) => {
  const { products } = props;
  const rows = products.map(getRow);
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
