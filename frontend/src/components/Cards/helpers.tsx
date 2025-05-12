import dayjs from 'dayjs';
import { db } from '../../../wailsjs/go/models';
import { SortOption } from '../SortSelect/consts';
import { Card } from './Card';

export const renderCard = (
  timezones: db.TimezoneEntry[],
  sortOpt: SortOption
) => {
  const sortedTimezones = [...timezones].sort((a, b) => {
    if (sortOpt === SortOption.ALPHABET) {
      return a.id - b.id;
    }
    if (sortOpt === SortOption.LAST_CREATED) {
      return dayjs(a.added_at).isAfter(dayjs(b.added_at)) ? -1 : 1;
    }
    if (sortOpt === SortOption.OFFSET) {
      return (
        dayjs().tz(a.timezone).utcOffset() - dayjs().tz(b.timezone).utcOffset()
      );
    }
    return 0;
  });

  return sortedTimezones.map((tz) => (
    <Card key={tz.id} timezone={tz.timezone} />
  ));
};
