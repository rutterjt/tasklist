import React from 'react';

import { render, RenderOptions } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StoreProvider } from '../store/context';
import { HelmetProvider } from 'react-helmet-async';

const Wrapper: React.FC = ({ children }) => (
  <HelmetProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StoreProvider
        testDefaultState={{
          labels: [
            {
              name: 'Preloaded Test Label',
              color: 'blue',
              id: 'preloaded-test-label',
            },
          ],
        }}
      >
        {children}
      </StoreProvider>
    </LocalizationProvider>
  </HelmetProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };
