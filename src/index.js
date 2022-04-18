import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

// store
import { Provider } from 'react-redux';
import store from './app/store';
import { saveState } from './app/localStorage';

// mui/date
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// react helmet
import { HelmetProvider } from 'react-helmet-async';

// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// store.subscribe(() => {
//   const { list, labels } = store.getState();
//   saveState({ list, labels });
// });

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
      </LocalizationProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
