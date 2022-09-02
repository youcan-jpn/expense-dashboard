import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


interface Props {
  onClick: any,
  disabled: boolean,
}

export const PlusButton = (props: Props) => {
  const {onClick, disabled} = props;

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add" onClick={()=>onClick()} disabled={disabled}>
        <AddIcon />
      </Fab>
    </Box>
  );
}
