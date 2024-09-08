import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';

import { setupInterceptors } from './core/api';
import store from './store';

import 'src/core/translation/i18n';

function App() {
  useEffect(() => {
    setupInterceptors(store);
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router.routes} />
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
