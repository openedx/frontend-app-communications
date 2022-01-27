import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import AppProvider from '@edx/frontend-platform/react/AppProvider';
import { configure as configureI18n } from '@edx/frontend-platform/i18n';
import { configure as configureLogging } from '@edx/frontend-platform/logging';
import { getConfig } from '@edx/frontend-platform';
import appMessages from './i18n';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
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

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedUser: jest.fn(() => ({
    userId: 'abc123',
    username: 'MockUser',
    roles: [],
    administrator: false,
  })),
}));
class MockLoggingService {
  logInfo = jest.fn();

  logError = jest.fn();
}

const loggingService = configureLogging(MockLoggingService, {
  config: getConfig(),
});

configureI18n({
  config: getConfig(),
  loggingService,
  messages: [appMessages],
});

function Wrapper({ children }) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <AppProvider>{children}</AppProvider>
  );
}

const renderWithProviders = (ui, options) => {
  render(ui, { wrapper: Wrapper, ...options });
};
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// Re-export everything.
export * from '@testing-library/react';

// Override `render` method.
export { renderWithProviders as render };
