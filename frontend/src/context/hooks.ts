import { useContext } from 'react';
import { TimezoneCtx } from '.';

export const useTimezone = () => {
  const {
    activeTimezone,
    sourceTimezone,
    selectedTime,
    sortOpt,
    setSortOpt,
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
    onChange,
    setSortOpt,
    setActiveTimezone,
  };
};
