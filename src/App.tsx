import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { theme } from 'material.theme';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';

import { DeepLinks } from './core/helpers/deepLinks';
import Spinner from './modules/General/components/Spinner';
import store from './store';

import 'src/core/translation/i18n';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router.routes} />
        </ThemeProvider>
        <DeepLinks />
        <Spinner />
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
