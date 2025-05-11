import {
  Box,
  cardActionAreaClasses,
  cardActionsClasses,
  cardContentClasses,
  styled,
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import TextField, { textFieldClasses } from '@mui/material/TextField';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  padding: theme.spacing(2),
  maxWidth: '100%',
}));

export const CardWrapper = styled(MuiCard)(({ theme }) => ({
  maxWidth: 345,
  backgroundColor: '#4f6a8e',
  color: theme.palette.primary.contrastText,
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

export const StyledField = styled(TextField)(({ theme }) => ({
  width: '50%',
  '& input': {
    padding: 10,
  },
}));
