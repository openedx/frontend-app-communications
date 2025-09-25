import {
  APP_INIT_ERROR, APP_READY, subscribe,
} from '@edx/frontend-platform';

// Jest needs this for module resolution
import * as app from '.'; // eslint-disable-line @typescript-eslint/no-unused-vars

// These need to be var not let so they get hoisted
// and can be used by jest.mock (which is also hoisted)
var mockRender; // eslint-disable-line no-var
var mockCreateRoot; // eslint-disable-line no-var
jest.mock('react-dom/client', () => {
  mockRender = jest.fn();
  mockCreateRoot = jest.fn(() => ({
    render: mockRender,
  }));

  return ({
    createRoot: mockCreateRoot,
  });
});

jest.mock('@edx/frontend-platform', () => ({
  APP_READY: 'app-is-ready-key',
  APP_INIT_ERROR: 'app-init-error',
  subscribe: jest.fn(),
  initialize: jest.fn(),
  mergeConfig: jest.fn(),
  getConfig: () => ({
    FAVICON_URL: 'favicon-url',
  }),
  ensureConfig: jest.fn(),
}));

jest.mock('./components/bulk-email-tool/BulkEmailTool', () => 'Bulk Email Tool');
jest.mock('./components/page-container/PageContainer', () => 'Page Container');

describe('app registry', () => {
  let getElement;

  beforeEach(() => {
    mockCreateRoot.mockClear();
    mockRender.mockClear();

    getElement = window.document.getElementById;
    window.document.getElementById = jest.fn(id => ({ id }));
  });
  afterAll(() => {
    window.document.getElementById = getElement;
  });

  test('subscribe: APP_READY.  links App to root element', () => {
    const callArgs = subscribe.mock.calls[0];
    expect(callArgs[0]).toEqual(APP_READY);
    callArgs[1]();
    const [rendered] = mockRender.mock.calls[0];
    expect(rendered).toMatchSnapshot();
  });
  test('subscribe: APP_INIT_ERROR.  snapshot: displays an ErrorPage to root element', () => {
    const callArgs = subscribe.mock.calls[1];
    expect(callArgs[0]).toEqual(APP_INIT_ERROR);
    const error = { message: 'test-error-message' };
    callArgs[1](error);
    const [rendered] = mockRender.mock.calls[0];
    expect(rendered).toMatchSnapshot();
  });
});
