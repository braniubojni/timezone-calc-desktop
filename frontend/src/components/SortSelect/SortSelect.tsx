import NativeSelect from '@mui/material/NativeSelect';
import * as React from 'react';
import { useTimezone } from '../../context/hooks';
import { sortOpts } from './consts';
import { BootstrapInput, SelectWrapper } from './styles';

export const SortSelect = () => {
  const { setSortOpt } = useTimezone();
  const [value, setValue] = React.useState(sortOpts[0].value);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setValue(selectedValue);
    setSortOpt(selectedValue);
  };

  return (
    <SelectWrapper sx={{ m: 1 }} variant="standard">
      <NativeSelect
        value={value}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        {sortOpts.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </NativeSelect>
    </SelectWrapper>
  );
};
