import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoupeIcon from '@mui/icons-material/Loupe';
import DeleteIcon from '@mui/icons-material/Delete';

import { receiptContext } from '../../pages/Receipt.page';
import { deleteReceiptById } from '../../../api/receipts';
import type { ReceiptId } from '../../../domains/receipts';

interface IProps {
  receipt_id: ReceiptId
  anchorEl: HTMLElement | null,
  open: boolean,
  onClose: () => void,
}

const ReceiptMenu: React.FC<IProps> = (props) => {
  const { receipt_id, anchorEl, open, onClose } = props;
  const navigate = useNavigate();
  const fetchReceiptList = useContext(receiptContext);

  const HandleClick = () => {
    navigate(`/receipts/${receipt_id}`)
  }

  const HandleDelete = async () => {
    const res = await deleteReceiptById(receipt_id);
    if (!res.isSuccess) {
      console.log(res);
    }
    fetchReceiptList();
    onClose();
  }

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
      >
        <MenuItem onClick={HandleClick}>
          <ListItemIcon>
            <LoupeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Detail</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={HandleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
}

export default ReceiptMenu;