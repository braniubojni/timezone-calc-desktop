import {
  Box,
  cardActionsClasses,
  cardContentClasses,
  styled,
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import TextField from '@mui/material/TextField';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  maxWidth: '100%',
  transition: '0.3s',
}));

export const CardWrapper = styled(MuiCard)(({ theme }) => ({
  maxWidth: 345,
  backgroundColor: '#4f6a8e',
  color: theme.palette.primary.contrastText,
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transition: '0.3s',
    '& > svg': {
      display: 'block',
    },
  },
  '& > svg': {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.spacing(1),
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    display: 'none',
  },
  [`& .${cardContentClasses.root}`]: {
    padding: theme.spacing(5),
  },
  [`& .${cardActionsClasses.root}`]: {
    margin: theme.spacing(2),
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const StyledField = styled(TextField)({
  width: '100%',
  '& input': {
    padding: 10,
    color: '#fff',
  },
});
