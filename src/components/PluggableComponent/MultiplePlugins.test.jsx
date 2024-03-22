import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MultiplePlugins from './MultiplePlugins';

describe('MultiplePlugins', () => {
  const mockPlugins = [
    { id: 'plugin1', name: 'Plugin1' },
    { id: 'plugin2', name: 'Plugin2' },
  ];

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  /* eslint-disable react/prop-types */
  test('initializes with loading components for each plugin', async () => {
    const { getAllByText } = render(
      <MultiplePlugins
        plugins={mockPlugins}
        pluggableComponentProps={{}}
        loadingComponent={<div>Loading...</div>}
      />,
    );

    const [pluginLoading1, pluginLoading2] = getAllByText('Loading...');

    expect(pluginLoading1).toBeInTheDocument();
    expect(pluginLoading1).toHaveTextContent('Loading...');
    expect(pluginLoading2).toBeInTheDocument();
    expect(pluginLoading2).toHaveTextContent('Loading...');
  });

  test('loads a plugins list successfully', async () => {
    const mockValidPlugins = [
      { id: 'plugin1', name: 'communications-app-test-component' },
    ];

    const MockPluginComponent = () => <div data-testid="plugin1">Mocked Plugin Component</div>;

    jest.mock(
      '@node_modules/@openedx-plugins/communications-app-test-component',
      () => MockPluginComponent,
    );

    const { getByTestId } = render(
      <MultiplePlugins plugins={mockValidPlugins} pluggableComponentProps={{}} />,
    );

    await waitFor(() => {
      const pluginComponent = getByTestId('plugin1');
      expect(pluginComponent).toBeInTheDocument();
      expect(pluginComponent).toHaveTextContent('Mocked Plugin Component');
    });
  });

  test('loads a plugin successfully with prefix', async () => {
    const MockPluginComponent = () => <div data-testid="communications-app-test-component">Mocked Plugin Component</div>;

    jest.mock(
      '@node_modules/@openedx-plugins/communications-app-test-component',
      () => MockPluginComponent,
    );

    const { getByTestId } = render(
      <MultiplePlugins
        pluggableComponentProps={{}}
        prefix="communications-app-test"
      />,
    );

    await waitFor(() => {
      const pluginComponent = getByTestId('communications-app-test-component');
      expect(pluginComponent).toBeInTheDocument();
      expect(pluginComponent).toHaveTextContent('Mocked Plugin Component');
    });
  });

  test('loads a plugin successfully with prefix changing component props', async () => {
    const MockPluginComponent = (props) => <div data-testid="mock-plugin-props">{props.title}</div>;

    jest.mock(
      '@node_modules/@openedx-plugins/communications-app-test-component',
      () => MockPluginComponent,
    );

    const { getByTestId, rerender } = render(
      <MultiplePlugins
        prefix="communications-app-test"
        pluggableComponentProps={{ title: 'Initial Title' }}
      />,
    );

    // Wait for the component to be in the document with initial props
    await waitFor(() => {
      const pluginComponent = getByTestId('mock-plugin-props');
      expect(pluginComponent).toBeInTheDocument();
      expect(pluginComponent).toHaveTextContent('Initial Title');
    });

    rerender(
      <MultiplePlugins
        prefix="communications-app-test"
        pluggableComponentProps={{ title: 'Title updated' }}
      />,
    );

    await waitFor(() => {
      const pluginComponent = getByTestId('mock-plugin-props');
      expect(pluginComponent).toBeInTheDocument();
      expect(pluginComponent).toHaveTextContent('Title updated');
    });
  });
});
