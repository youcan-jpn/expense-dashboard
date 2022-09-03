import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';

interface IProps {
  open: boolean,
  openSetter: (state: boolean) => void,
  postHandler: () => void,
  changeHandler: (e: any) => void,
}
export const AddShopDialog = (props: IProps) => {
  const { open, openSetter, postHandler, changeHandler } = props;

  return (
    <Dialog open={open} onClose={() => openSetter(false)}>
    <DialogTitle id="add-shop-dialog">
      Add New Shop
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="add-shop-dialog-description">
        Enter new shop's name
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Input placeholder='new shop' type="text" id="newShopName" onChange={changeHandler}/>
      <Button onClick={postHandler}><SendIcon /></Button>
    </DialogActions>
  </Dialog>
  )
}