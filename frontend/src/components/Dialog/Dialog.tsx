import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export interface SimpleDialogProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const Dialog: React.FC<SimpleDialogProps> = ({
  onClose,
  open,
  onSubmit,
  title,
  content,
}) => {
  return (
    <MuiDialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
