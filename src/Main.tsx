import { CurrentAppProvider, getSiteConfig, useIntl } from '@openedx/frontend-base';
import { Helmet } from 'react-helmet';

import { appId } from './constants';
import messages from './messages';
import BulkEmailTool from './components/bulk-email-tool/BulkEmailTool';
import PageContainer from './components/page-container/PageContainer';

const Main = () => {
  const { formatMessage } = useIntl();
  return (
    <CurrentAppProvider appId={appId}>
      <Helmet>
        <title>
          {formatMessage(messages['bulk.email.page.title'], {
            siteName: getSiteConfig().siteName,
          })}
        </title>
      </Helmet>
      <PageContainer>
        <BulkEmailTool />
      </PageContainer>
    </CurrentAppProvider>
  );
};

export default Main;
