import {
  default as CancelIcon,
  default as SvgIcon,
} from '@mui/icons-material/Cancel';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';
import { RemoveTimezone } from '../../../wailsjs/go/main/App';
import { useTimezone } from '../../context/hooks';
import { Dialog } from '../Dialog';
import { CardWrapper, StyledTimePicker } from './styles';

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

  const value: Dayjs | null = React.useMemo(() => {
    if (!selectedTime || !sourceTimezone) return null;
    const base = dayjs.tz(
      `${dayjs().format('YYYY-MM-DD')} ${selectedTime}`,
      sourceTimezone
    );
    return base.tz(timezone);
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <StyledTimePicker
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={value}
              onChange={(e) => {
                if (!isSource) {
                  setActiveTimezone(timezone);
                }
                onChange(e ? e.format('HH:mm') : '', timezone);
              }}
              maxTime={dayjs('23:59', 'HH:mm')}
              minTime={dayjs('00:00', 'HH:mm')}
              format="HH:mm"
              slotProps={{
                textField: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CancelIcon
                        cursor="pointer"
                        onClick={() => onChange('', timezone)}
                        sx={{ color: value ? 'inherit' : 'transparent' }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
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
