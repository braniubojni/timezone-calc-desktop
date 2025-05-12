import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import { AddTzDialog } from './components/AddTzDialog';
import { Cards } from './components/Cards';
import { SortSelect } from './components/SortSelect';
import { TimezoneProvider } from './context/TimezoneProvider';
import { StyledBox, Wrapper } from './styles';

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(customParseFormat);

function App() {
  const [isAddTz, setIsAddTz] = useState<boolean>(false);
  const onClose = () => {
    setIsAddTz(false);
  };

  return (
    <div id="App">
      <TimezoneProvider>
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
            <Box component="h3">
              Current Time {dayjs().tz().format('HH:mm')}
            </Box>
          </Box>
          <Wrapper>
            <SortSelect />
            <Cards />
          </Wrapper>
        </StyledBox>
        <AddTzDialog open={isAddTz} handleClose={onClose} />
      </TimezoneProvider>
    </div>
  );
}

export default App;
