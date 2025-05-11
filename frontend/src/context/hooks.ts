import { useContext } from 'react';
import { TimezoneCtx } from '.';
import dayjs from 'dayjs';

export const useTimezone = () => {
  const { activeTimezone, localTimezone, setActiveTimezone } =
    useContext(TimezoneCtx);
  const onChange = (time: string, tz: string) => {
    // const now = dayjs();
    // const sourceDateTime = dayjs.tz(`${now.format('YYYY-MM-DD')} ${time}`, tz);
    // const localTime = sourceDateTime.tz(localTimezone);
    // console.log(
    //   `Local time (${localTimezone}) would be ${localTime.format(
    //     'YYYY-MM-DD HH:mm'
    //   )}`
    // );
  };

  return {
    activeTz: activeTimezone,
    onChange,
    setActiveTimezone,
  };
};
