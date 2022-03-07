import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, AuthenticatedPageRoute, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import { Switch } from 'react-router-dom';
import appMessages from './i18n';

import './index.scss';
import BulkEmailTool from './components/bulk-email-tool';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Header />
      <div className="container">
        <Switch>
          <AuthenticatedPageRoute path="/courses/:courseId/bulk_email" component={BulkEmailTool} />
        </Switch>
      </div>
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  config: () => {
    mergeConfig({
    }, 'CommuncationsAppConfig');
  },
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
});
