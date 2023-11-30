import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig, getConfig,
} from '@edx/frontend-platform';
import { AppProvider, AuthenticatedPageRoute, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import messages from './i18n';

import './index.scss';
import BulkEmailTool from './components/bulk-email-tool';
import PageContainer from './components/page-container/PageContainer';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Helmet>
        <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
      </Helmet>
      <div className="pb-3 container">
        <Routes>
          <Route
            path="/courses/:courseId/bulk_email"
            element={(
              <AuthenticatedPageRoute>
                <PageContainer>
                  <BulkEmailTool />
                </PageContainer>
              </AuthenticatedPageRoute>
            )}
          />
        </Routes>
      </div>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      mergeConfig(
        {
          // MICROBA-1505: Remove this when we remove the flag from config
          SCHEDULE_EMAIL_SECTION: process.env.SCHEDULE_EMAIL_SECTION || null,
        },
        'CommunicationsAppConfig',
      );
    },
  },
  messages,
});
