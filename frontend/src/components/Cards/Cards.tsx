import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetTimezoneList } from '../../../wailsjs/go/main/App';
import { useTimezone } from '../../context/hooks';
import { Loader } from '../Loader';
import { renderCard } from './helpers';
import { Wrapper } from './styles';

export const Cards = () => {
  const { sortOpt } = useTimezone();
  const { data: timezones = [], isLoading } = useQuery({
    queryKey: ['usrTimezones'],
    queryFn: GetTimezoneList,
    select(data) {
      return data?.length ? data : [];
    },
  });

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
