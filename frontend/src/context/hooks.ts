import { useContext } from 'react';
import { TimezoneCtx } from '.';

export const useTimezone = () => {
  const {
    activeTimezone,
    sourceTimezone,
    selectedTime,
    isUsrTimezoneRefresh,
    sortOpt,
    setSortOpt,
    setIsUsrTimezoneRefresh,
    setActiveTimezone,
    setSelectedTime,
    setSourceTimezone,
  } = useContext(TimezoneCtx);
  const onChange = (time: string, tz: string) => {
    setSelectedTime(time);
    setSourceTimezone(tz);
    setActiveTimezone(tz);
  };

  return {
    sortOpt,
    activeTz: activeTimezone,
    selectedTime,
    sourceTimezone,
    isUsrTimezoneRefresh,
    onChange,
    setSortOpt,
    setActiveTimezone,
    setIsUsrTimezoneRefresh,
  };
};
