import { cardActionsClasses, cardContentClasses, styled } from '@mui/material';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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

export const StyledTimePicker = styled(TimePicker)({
  background: 'white',
  borderRadius: 4,
  width: '100%',
  '& .MuiPickersSectionList-root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& input': {
    padding: 0,
  },
  '& .MuiInputBase-input': {
    color: '#000',
    fontSize: 14,
    fontWeight: 400,
  },
  '& .Mui-focused': {
    boxShadow: '0px 6px 12px 0px rgba(10, 62, 102, 0.02)',
    '&:hover': {
      '& > .MuiOutlinedInput-notchedOutline': {
        border: `1px solid darkblue`,
      },
    },

    '& > .MuiOutlinedInput-notchedOutline': {
      border: `1px solid darkblue`,
    },
  },
  '& .MuiInputBase-root': {
    width: '100%',
    height: '100%',

    '&:hover': {
      '& > fieldset': {
        border: `1px solid gray`,
      },
    },

    '& > fieldset': {
      '&:hover': {
        boxShadow: '0px 6px 12px 0px rgba(10, 62, 102, 0.02)',
      },
      border: `1px solid gray`,
    },
  },
  '& .Mui-disabled': {
    boxShadow: 'none',
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid gray !important`,
    },
  },

  '& .Mui-error': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid red !important`,
      '&:hover': {
        border: `1px solid red`,
      },
    },
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'gray',
    },

    '&.Mui-focused fieldset': {
      borderColor: `darkblue`,
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: `darkblue`,
      border: `1px solid darkblue`,
    },
  },
  fieldset: {
    borderColor: '#FCFDFD',
  },
});
