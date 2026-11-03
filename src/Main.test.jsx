import React from 'react';
import { getSiteConfig } from '@openedx/frontend-base';
import {
  initializeMockApp, render, screen, waitFor,
} from './setupTest';
import Main from './Main';

jest.mock('./components/page-container/PageContainer', () => ({
  __esModule: true,
  // eslint-disable-next-line react/prop-types
  default: ({ children }) => <main>{children}</main>,
}));

jest.mock('./components/bulk-email-tool/BulkEmailTool', () => ({
  __esModule: true,
  default: () => <h1>Bulk Email Tool</h1>,
}));

describe('Main', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });

  test('renders the bulk email tool inside the page container and sets the page title', async () => {
    render(<Main />);

    expect(screen.getByRole('main')).toContainElement(screen.getByRole('heading', { name: 'Bulk Email Tool' }));
    await waitFor(() => expect(document.title).toEqual(`Bulk Email | ${getSiteConfig().siteName}`));
  });
});
