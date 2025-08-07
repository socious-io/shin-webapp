import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import App from './App';
import './styles/main.scss';
import { FallBack } from './pages/error/fallback';
import { logError } from './pages/error/fallback/index.services';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="version" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <title>{'Socious Verify'}</title>
    </Helmet>
    <ErrorBoundary fallback={<FallBack />} onError={logError}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </>,
);
defineCustomElements(window);
