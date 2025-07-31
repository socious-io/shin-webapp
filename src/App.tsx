import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';

import { RTL_LANGUAGES } from './constants/LANGUAGES';
import { setupInterceptors } from './core/api';
import store from './store';
import 'src/core/translation/i18n';
import { currentOrganizations } from './store/thunks/organizations.thunks';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    const direction = RTL_LANGUAGES.includes(currentLang) ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  useEffect(() => {
    setupInterceptors(store);
    store.dispatch(currentOrganizations());
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router.routes} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
