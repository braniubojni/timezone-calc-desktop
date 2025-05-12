import { FC, ReactNode, useState } from 'react';
import { TimezoneCtx } from '.';
import dayjs from 'dayjs';
import { SortOption } from '../components/SortSelect/consts';

type TimezoneProviderProps = {
  children: ReactNode;
};

export const TimezoneProvider: FC<TimezoneProviderProps> = ({ children }) => {
  const [activeTimezone, setActiveTimezone] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sourceTimezone, setSourceTimezone] = useState<string>('');
  const [isUsrTimezoneRefresh, setIsUsrTimezoneRefresh] =
    useState<boolean>(false);
  const [sortOpt, setSortOpt] = useState<SortOption>(SortOption.ALPHABET);
  return (
    <TimezoneCtx.Provider
      value={{
        activeTimezone,
        localTimezone: dayjs.tz.guess(),
        setActiveTimezone,
        selectedTime,
        setSelectedTime,
        sourceTimezone,
        setSourceTimezone,
        isUsrTimezoneRefresh,
        setIsUsrTimezoneRefresh,
        sortOpt,
        setSortOpt,
      }}
    >
      {children}
    </TimezoneCtx.Provider>
  );
};
