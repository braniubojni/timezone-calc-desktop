import { boxClasses, Container, styled } from '@mui/material';

export const StyledBox = styled(Container)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(3),
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
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
