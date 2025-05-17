import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/material';
import { SortSelect } from '../SortSelect';
import { IconWrapper, Wrapper } from './styles';
import { RemoveAllTimezones } from '../../../wailsjs/go/main/App';
import { Dialog } from '../Dialog';
import React from 'react';
import { useTimezone } from '../../context/hooks';

export const CardsHeader = () => {
  const { setIsUsrTimezoneRefresh } = useTimezone();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClick = () => {
    setOpenDialog(true);
  };
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
        onSubmit={async () => {
          setOpenDialog(false);
          await RemoveAllTimezones().catch((err) => {
            console.error('Error removing all timezones:', err);
          });
          setIsUsrTimezoneRefresh((p) => !p);
        }}
        content="Are you sure you want to delete all this timezones?"
      />
    </>
  );
};
