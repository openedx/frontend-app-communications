import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import AppProvider from '@edx/frontend-platform/react/AppProvider';
import { configure as configureI18n, IntlProvider } from '@edx/frontend-platform/i18n';
import { configure as configureLogging, MockLoggingService } from '@edx/frontend-platform/logging';
import { getConfig, mergeConfig } from '@edx/frontend-platform';
import { configure as configureAuth, MockAuthService } from '@edx/frontend-platform/auth';
import messages from './i18n';

jest.mock('@edx/frontend-platform/react/hooks', () => ({
  ...jest.requireActual('@edx/frontend-platform/react/hooks'),
  useTrackColorSchemeChoice: jest.fn(),
  useParagonTheme: () => [{ isThemeLoaded: true }, jest.fn()],
}));

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
  mergeConfig({
    // MICROBA-1505: Remove this when we remove the flag from config
    SCHEDULE_EMAIL_SECTION: true,
    authenticatedUser: {
      userId: 'abc123',
      username: 'Mock User',
      roles: [],
      administrator: false,
    },
  });

  const loggingService = configureLogging(MockLoggingService, {
    config: getConfig(),
  });

  const i18nService = configureI18n({
    config: getConfig(),
    loggingService,
    messages,
  });

  const authService = configureAuth(MockAuthService, { config: getConfig(), loggingService });
  return { loggingService, i18nService, authService };
}

function render(ui, options) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <IntlProvider locale="en">
        <AppProvider>{children}</AppProvider>
      </IntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything.
export * from '@testing-library/react';

// Override `render` method.
export { render };
