import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { init } from 'src/core/helpers/datadog';

import App from './App';
import './styles/main.scss';
import { FallBack } from './pages/fallback';
import { logError } from './pages/fallback/index.services';
import store from './store';

const VERSION = '7.0.0';
init(VERSION);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="version" content={VERSION} />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <title>Shin</title>
    </Helmet>
    <ErrorBoundary fallback={<FallBack />} onError={logError}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </>,
);
defineCustomElements(window);
