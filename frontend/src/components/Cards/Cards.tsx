import React from 'react';
import { Card } from './Card';
import { Wrapper } from './styles';
import { GetTimezoneList } from '../../../wailsjs/go/main/App';
import { Loader } from '../Loader';
import { db } from '../../../wailsjs/go/models';
import { useTimezone } from '../../context/hooks';
import { Typography } from '@mui/material';
import { renderCard } from './helpers';

export const Cards = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [timezones, setTimezones] = React.useState<db.TimezoneEntry[]>([]);
  const { isUsrTimezoneRefresh, sortOpt } = useTimezone();
  console.log({ sortOpt });

  React.useEffect(() => {
    setIsLoading(true);
    GetTimezoneList()
      .then((tzList) => {
        setTimezones(tzList ?? []);
      })
      .catch(() => {
        console.error('Failed to get timezones');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isUsrTimezoneRefresh]);

  return (
    <Wrapper>
      {isLoading ? <Loader /> : null}
      {renderCard(timezones, sortOpt)}
      {!timezones.length && (
        <Typography variant="h6" color="white">
          No timezones added
        </Typography>
      )}
    </Wrapper>
  );
};
