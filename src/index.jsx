import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, AuthenticatedPageRoute, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import { messages as headerMessages } from '@edx/frontend-component-header';
import { messages as footerMessages } from '@edx/frontend-component-footer';
import { messages as paragonMessages } from '@edx/paragon';
import { Switch } from 'react-router-dom';
import appMessages from './i18n';

import './index.scss';
import BulkEmailTool from './components/bulk-email-tool';
import PageContainer from './components/page-container/PageContainer';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <div className="pb-3 container">
        <Switch>
          <AuthenticatedPageRoute path="/courses/:courseId/bulk_email">
            <PageContainer>
              <BulkEmailTool />
            </PageContainer>
          </AuthenticatedPageRoute>
        </Switch>
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
  messages: [appMessages, headerMessages, footerMessages, paragonMessages],
});
