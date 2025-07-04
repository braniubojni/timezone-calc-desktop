import { createContext } from 'react';
import { SortOption } from '../components/SortSelect/consts';

type TimezoneContext = {
  activeTimezone: string | null;
  setActiveTimezone: React.Dispatch<React.SetStateAction<string | null>>;
  localTimezone: string;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  sourceTimezone: string;
  setSourceTimezone: React.Dispatch<React.SetStateAction<string>>;
  sortOpt: SortOption;
  setSortOpt: React.Dispatch<React.SetStateAction<SortOption>>;
};

export const TimezoneCtx = createContext<TimezoneContext>({
  activeTimezone: null,
  setActiveTimezone: () => {},
  localTimezone: '',
  selectedTime: '',
  setSelectedTime: () => {},
  sourceTimezone: '',
  setSourceTimezone: () => {},
  sortOpt: SortOption.ALPHABET,
  setSortOpt: () => {},
});
