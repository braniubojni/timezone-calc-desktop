import {
  default as CloseIcon,
  default as SvgIcon,
} from '@mui/icons-material/Close';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as React from 'react';
import { RemoveTimezone } from '../../../wailsjs/go/main/App';
import { useTimezone } from '../../context/hooks';
import { Dialog } from '../Dialog';
import { CardWrapper, StyledField } from './styles';

type CardProps = {
  timezone: string;
};

export const Card: React.FC<CardProps> = ({ timezone }) => {
  const time = dayjs().tz(timezone).format('HH:mm');
  const [, city] = timezone.split('/');
  const offset = dayjs().tz(timezone).format('Z');
  const [openDialog, setOpenDialog] = React.useState(false);

  const {
    selectedTime,
    sourceTimezone,
    onChange,
    setActiveTimezone,
    setIsUsrTimezoneRefresh,
  } = useTimezone();
  const onDel = () => {
    setOpenDialog(true);
  };

  const isSource = timezone === sourceTimezone;

  const value = React.useMemo(() => {
    if (!selectedTime || !sourceTimezone) return '00:00';
    const base = dayjs.tz(
      `${dayjs().format('YYYY-MM-DD')} ${selectedTime}`,
      sourceTimezone
    );
    return base.tz(timezone).format('HH:mm');
  }, [selectedTime, sourceTimezone, timezone]);

  return (
    <CardWrapper>
      <SvgIcon onClick={onDel}>
        <CloseIcon />
      </SvgIcon>
      <CardContent>
        <Typography variant="h5" component="div" noWrap>
          {city.split('_').join(' ')}
        </Typography>
        <Typography noWrap>Current time {time}</Typography>
        <Typography noWrap>Offset {offset}</Typography>
      </CardContent>
      <CardActions>
        <StyledField
          variant="filled"
          type="time"
          margin="none"
          size="small"
          value={value}
          onChange={(e) => {
            if (!isSource) {
              setActiveTimezone(timezone);
            }
            onChange(e.target.value, timezone);
          }}
          fullWidth
          autoComplete="off"
        />
      </CardActions>
      <Dialog
        open={openDialog}
        title="Delete timezone"
        onClose={() => setOpenDialog(false)}
        onSubmit={async () => {
          setOpenDialog(false);
          await RemoveTimezone(timezone);
          setIsUsrTimezoneRefresh((p) => !p);
        }}
        content="Are you sure you want to delete this timezone?"
      />
    </CardWrapper>
  );
};
