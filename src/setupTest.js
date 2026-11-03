import '@testing-library/jest-dom';
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import siteConfig from 'site.config';
import {
  addAppConfigs,
  initializeMockApp as initializeFrontendBaseMockApp,
  IntlProvider,
  mergeSiteConfig,
} from '@openedx/frontend-base';

mergeSiteConfig(siteConfig);
addAppConfigs();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.Date.prototype.toLocaleDateString = jest.fn();

export function initializeMockApp() {
  return initializeFrontendBaseMockApp({
    authenticatedUser: {
      userId: 'abc123',
      username: 'Mock User',
      roles: [],
      administrator: false,
    },
  });
}

export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

export const createQueryWrapper = () => {
  const queryClient = createQueryClient();
  // eslint-disable-next-line react/prop-types
  function QueryWrapper({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }
  return QueryWrapper;
};

function render(ui, options) {
  const queryClient = createQueryClient();
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      <IntlProvider locale="en">
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </MemoryRouter>
      </IntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything.
export * from '@testing-library/react';

// Override `render` method.
export { render };
