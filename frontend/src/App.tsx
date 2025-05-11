import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import { AddTzDialog } from './components/AddTzDialog';
import { Cards } from './components/Cards';
import { TimezoneCtx } from './context';
import { StyledBox } from './styles';

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(customParseFormat);

function App() {
  const [activeTimezone, setActiveTimezone] = useState<string | null>(null);
  const [isAddTz, setIsAddTz] = useState<boolean>(false);
  const onClose = () => {
    setIsAddTz(false);
  };

  return (
    <div id="App">
      <TimezoneCtx.Provider
        value={{
          activeTimezone,
          localTimezone: dayjs.tz.guess(),
          setActiveTimezone,
        }}
      >
        <StyledBox>
          <Box>
            <IconButton onClick={() => setIsAddTz(true)}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box component="h4">
              Current Time {dayjs().tz().format('HH:mm')}
            </Box>
          </Box>
          <Box>
            <Cards />
          </Box>
        </StyledBox>
        <AddTzDialog open={isAddTz} handleClose={onClose} />
      </TimezoneCtx.Provider>
    </div>
  );
}

export default App;
