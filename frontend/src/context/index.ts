import { createContext } from 'react';

type TimezoneContext = {
  activeTimezone: string | null;
  setActiveTimezone: (timezone: string) => void;
  localTimezone: string;
};

export const TimezoneCtx = createContext<TimezoneContext>({
  activeTimezone: null,
  setActiveTimezone: () => {},
  localTimezone: '',
});
