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
  placeHolder: string
  usage: 'add' | 'alter'
}
export const AddShopDialog = (props: IProps) => {
  const { open, usage, placeHolder, openSetter, postHandler, changeHandler } = props;
  let title = 'Title'
  let message = 'message here'

  if (usage === 'add') {
    title = 'Add New Shop';
    message = "Enter new shop's name"
  } else if (usage === 'alter') {
    title = 'Alter Shop Name';
    message = "Enter new shop name"
  }

  return (
    <Dialog open={open} onClose={() => openSetter(false)}>
    <DialogTitle id="add-shop-dialog">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="add-shop-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Input placeholder={placeHolder} type="text" id="newShopName" onChange={changeHandler}/>
      <Button onClick={postHandler}><SendIcon /></Button>
    </DialogActions>
  </Dialog>
  )
}