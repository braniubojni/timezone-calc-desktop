import { Box, boxClasses, styled } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(3),
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  minWidth: 450,
  [`& .${boxClasses.root}:first-of-type`]: {
    alignSelf: 'self-end',
    selfAlign: 'flex-end',
    ['& .MuiButtonBase-root']: {
      color: '#fff',
      '& > svg': {
        cursor: 'pointer',
      },
    },
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
