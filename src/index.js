import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

// store
import { StoreProvider } from './store/context';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <CssBaseline />
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
