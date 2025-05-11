import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as React from 'react';
import { CardWrapper, StyledField } from './styles';
import { useTimezone } from '../../context/hooks';

type CardProps = {
  timezone: string;
};

export const Card: React.FC<CardProps> = ({ timezone }) => {
  const [value, setValue] = React.useState<string>('');
  const time = dayjs().tz(timezone).format('HH:mm');
  const [, city] = timezone.split('/');
  const offset = dayjs().tz(timezone).format('Z');
  const { activeTz, onChange, setActiveTimezone } = useTimezone();

  React.useEffect(() => {
    if (dayjs(value, 'HH:mm', true).isValid()) {
      console.log({ value });
    }
  }, [value]);

  return (
    <CardWrapper>
      <CardContent>
        <Typography noWrap>
          Current time {city}, {time}
        </Typography>
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
            if (timezone !== activeTz) {
              setActiveTimezone(timezone);
            }
            setValue(e.target.value);
          }}
          fullWidth
          autoComplete="off"
        />
      </CardActions>
    </CardWrapper>
  );
};
