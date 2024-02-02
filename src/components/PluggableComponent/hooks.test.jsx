import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { usePlugins } from './hooks';

describe('usePlugins', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  const mockPlugins = [
    { id: 'plugin1', name: 'Plugin1' },
    { id: 'plugin2', name: 'Plugin2' },
  ];

  /* eslint-disable react/prop-types */
  const ComponentsContainer = ({
    plugins = [],
    pluggableComponentProps = {},
    prefix = '',
    loadingComponent,
  }) => {
    const pluginComponents = usePlugins(
      plugins,
      pluggableComponentProps,
      prefix,
      loadingComponent,
    );

    return (
      <>
        {Object.entries(pluginComponents).map(([pluginKey, Component]) => (
          <div key={pluginKey} data-testid={pluginKey}>
            {Component}
          </div>
        ))}
      </>
    );
  };

  const renderComponent = (overrideProps) => render(<ComponentsContainer {...overrideProps} />);

  test('initializes with loading components for each plugin', async () => {
    const { getByTestId } = renderComponent({
      plugins: mockPlugins,
      pluggableComponentProps: {},
      loadingComponent: <div>Loading...</div>,
    });

    expect(getByTestId('plugin1')).toHaveTextContent('Loading...');
    expect(getByTestId('plugin2')).toHaveTextContent('Loading...');
  });

  test('loads a plugins list successfully', async () => {
    const mockValidPlugins = [
      { id: 'plugin1', name: 'communications-app-test-component' },
    ];

    const MockPluginComponent = () => <div>Mocked Plugin Component</div>;

    jest.mock(
      '@node_modules/@openedx-plugins/communications-app-test-component',
      () => MockPluginComponent,
    );

    const { getByTestId } = renderComponent({
      plugins: mockValidPlugins,
      pluggableComponentProps: {},
    });

    await waitFor(() => {
      const pluginComponent = getByTestId('plugin1');
      expect(pluginComponent).toBeInTheDocument();
      expect(pluginComponent).toHaveTextContent('Mocked Plugin Component');
    });
  });

  test('loads a plugin successfully with prefix', async () => {
    const MockPluginComponent = () => <div>Mocked Plugin Component</div>;

    jest.mock(
      '@node_modules/@openedx-plugins/communications-app-test-component',
      () => MockPluginComponent,
    );

    const { getByTestId } = renderComponent({
      pluggableComponentProps: {},
      prefix: 'communications-app-test',
    });

    await waitFor(() => {
      const pluginComponent = getByTestId('communications-app-test-component');
      expect(pluginComponent).toBeInTheDocument();
      expect(pluginComponent).toHaveTextContent('Mocked Plugin Component');
    });
  });

  test('loads a plugin successfully with prefix changing component props', async () => {
    // eslint-disable-next-line react/prop-types
    const MockPluginComponent = (props) => {
      console.log('props', props);
      return <div data-testid="mock-plugin-props">{props.title}</div>;
    };

    jest.mock(
      '@node_modules/@openedx-plugins/communications-app-test-component',
      () => MockPluginComponent,
    );

    const ComponentsContainerUpdater = (overrideProps) => (
      <ComponentsContainer {...overrideProps} />
    );

    const { getByTestId, rerender } = render(
      <ComponentsContainerUpdater
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
      <ComponentsContainerUpdater
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
