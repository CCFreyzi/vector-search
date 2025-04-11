import React from 'react';
import { Container } from '@mui/material';
import FormSearch from './components/FormSearch';
import ResultGrid from './components/ResultGrid';
import mixpanel from 'mixpanel-browser';

mixpanel.init('654a44fc39f2a504fe467d0cf7ad5cab', {
    debug: true, 
    track_pageview: true, 
  });

function App() {

    
    return (
        <Container sx={{ mt: 4 }}>
            <FormSearch />
            <ResultGrid />
        </Container>
    );
}

export default App;
