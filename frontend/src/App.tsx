import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import { AddTzDialog } from './components/AddTzDialog';
import { Cards } from './components/Cards';
import { CardsHeader } from './components/CardsHeader';
import { TimezoneProvider } from './context/TimezoneProvider';
import { StyledBox, Wrapper } from './styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './consts';

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
      <QueryClientProvider client={queryClient}>
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
            <Wrapper
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <CardsHeader />
              <Cards />
            </Wrapper>
          </StyledBox>
          <AddTzDialog open={isAddTz} handleClose={onClose} />
        </TimezoneProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
