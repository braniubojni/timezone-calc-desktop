import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { RemoveAllTimezones } from '../../../wailsjs/go/main/App';
import { Dialog } from '../Dialog';
import { SortSelect } from '../SortSelect';
import { IconWrapper, Wrapper } from './styles';

export const CardsHeader = () => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClick = () => {
    setOpenDialog(true);
  };
  const { mutate } = useMutation({
    mutationFn: RemoveAllTimezones,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usrTimezones'],
      });
    },
  });
  return (
    <>
      <Wrapper>
        <Box>
          <SortSelect />
        </Box>
        <Box>
          <IconWrapper disableRipple onClick={handleClick}>
            <DeleteOutlineIcon />
          </IconWrapper>
        </Box>
      </Wrapper>
      <Dialog
        open={openDialog}
        title="Delete all timezones"
        onClose={() => setOpenDialog(false)}
        onSubmit={() => {
          setOpenDialog(false);
          mutate();
        }}
        content="Are you sure you want to delete all this timezones?"
      />
    </>
  );
};
