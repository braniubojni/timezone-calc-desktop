import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

export const Wrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
});

export const IconWrapper = styled(IconButton)({
  height: 50,
  width: 50,
  backgroundColor: 'MenuText',
  '&:hover': {
    backgroundColor: 'Menu',
  },
  '& svg': {
    height: '100%',
    width: '100%',
  },
  '& svg:hover': {
    color: 'MenuText',
    transition: 'color 0.3s ease',
  },
});
