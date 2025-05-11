import { Alert } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import {
  AddTimezone,
  GetTimezoneList,
  GetTimezones,
} from '../../../wailsjs/go/main/App';

type TAddTzDialogProps = {
  handleClose: () => void;
  open: boolean;
};

export const AddTzDialog: React.FC<TAddTzDialogProps> = ({
  handleClose,
  open,
}) => {
  const [opts, setOpts] = React.useState<string[]>([]);
  const optSet = React.useRef<Set<string> | null>(null);
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [errMsg, setErrMsg] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onCancel = () => {
    setValue(null);
    setInputValue('');
  };

  React.useEffect(() => {
    Promise.all([GetTimezones(), GetTimezoneList()])
      .then(([timezones, usrTimezones]) => {
        setOpts(timezones);
        optSet.current = new Set(usrTimezones.map((tz) => tz.timezone));
      })
      .catch(() => {
        setErrMsg('Failed to get timezones');
      });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          sx: {
            height: 'auto',
            overflow: 'unset',
          },
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (value) {
              setIsLoading(true);
              await AddTimezone(value)
                .then(() => {
                  setValue(null);
                  setInputValue('');
                  setErrMsg('');
                })
                .catch((e) => setErrMsg(e?.message))
                .finally(() => {
                  handleClose();
                  setIsLoading(false);
                });
            }
          },
        },
      }}
    >
      <DialogTitle>Add new timezone</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {errMsg && (
          <Alert variant="filled" severity="error">
            {errMsg}
          </Alert>
        )}
        <DialogContentText>
          To add new timezone, please enter the timezone name here.
        </DialogContentText>
        <Autocomplete
          autoFocus
          disablePortal
          value={value}
          onChange={(_: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onFocus={() => setErrMsg('')}
          fullWidth
          options={opts}
          clearOnEscape
          renderInput={(params) => <TextField {...params} label="Search" />}
          getOptionDisabled={(opt) => !!optSet.current?.has(opt)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={!value || isLoading} onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={!value || isLoading} type="submit">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
