import { Alert } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [errMsg, setErrMsg] = React.useState<string>('');
  const { mutate } = useMutation({
    mutationFn: AddTimezone,
    onError(error: Error) {
      setErrMsg(error.message);
    },
    onSuccess() {
      setValue(null);
      setInputValue('');
      setErrMsg('');
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['usrTimezones'],
      });
    },
  });
  const { data: usrTzs, isLoading: usrLoad } = useQuery({
    queryKey: ['usrTimezones'],
    queryFn: GetTimezoneList,
    enabled: open,
  });
  const { data: { disabledTzs, opts } = {}, isLoading: tzLoad } = useQuery({
    queryKey: ['timezones'],
    queryFn: GetTimezones,
    enabled: open && !usrLoad,
    select(data) {
      const disabledTzs = new Set();
      if (!data) return { opts: [], disabledTzs: disabledTzs };
      return {
        opts: data ?? [],
        disabledTzs: new Set(usrTzs?.map((tz) => tz.timezone) ?? []),
      };
    },
  });

  const onCancel = () => {
    setValue(null);
    setInputValue('');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableRestoreFocus
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
              mutate(value);
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
          getOptionLabel={(option) => option.replace(/_/g, ' ')}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onFocus={() => setErrMsg('')}
          fullWidth
          options={opts ?? []}
          renderInput={(params) => (
            <TextField {...params} autoFocus label="Search" />
          )}
          getOptionDisabled={(opt) => !!disabledTzs?.has(opt)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={!value || tzLoad} onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={!value || tzLoad} type="submit">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
